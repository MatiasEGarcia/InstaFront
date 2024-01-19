import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { follow, unFollowByFollowedId, updateFollowStatusByFollowId, updateFollowStatusByFollowerId } from "../../Service/FollowService";
import { getAllByAuthUser } from "../../Service/PublicationService";
import { getGeneralUserInfoById } from "../../Service/UserService";
import { BACK_HEADERS, FOLLOWED_STATUS, LOADING_OPTIONS, NOTIFICATION_SEVERITIES, PAG_TYPES } from "../../Util/UtilTexts";
import { useNotification } from "../../hooks/useNotification";
import { usePag } from "../../hooks/usePag";
import FollowModal from "../FollowModal";
import Loading from "../Loading";
import Modal from "../Modal";
import Pagination from "../Pagination";
import PublicationCard from "../PublicationCard";
import PublicationModal from "../PublicationModal";
import UserImageProfile from "../UserImageProfile";
import UserVisitedSocialInfo from "../UserVisitedSocialInfo";
import useAuth from "../../hooks/useAuth";


const publicationsBasePagDetails = {
    pageNo: 0,//first page is 0
    pageSize: 3,
    totalPages: undefined,
    totalElements: undefined,
    sortField: undefined,
    sortDir: undefined
}

/**
 * @returns {JSX.Element} - Main component for user home page. where should be its publications,followers ,etc.
 */
function UserMainHome() {
    const [loading, setLoading] = useState(true);
    const [followModalState, setFollowModalState] = useState(false);
    const [wichFollows, setWichFollows] = useState();
    const [publicationModalState, setPublicationModalState] = useState(false);
    const [publicationSelectedId, setPublicationSelectedId] = useState();
    const [userVisitedInfo, setUserVisitedInfo] = useState({});
    const {
        elements: publications,
        setElements: setPublications,
        pagDetails: publicationsPagDetails,
        setPagDetails: setPublicationsPagDetails,
        flagPagDetails: publicationsFlagPagDetails,
        setFlagPagDetails: setPublicationsFlagPagDetails,
        changePage: publicationsChangePage
    } = usePag({ ...publicationsBasePagDetails });
    const { setNotificationToast } = useNotification();
    const {auth} = useAuth();
    const { publicationId, userId } = useParams();

    useEffect(() => {
        if (publicationId) {
            setPublicationSelectedId(publicationId);
            setPublicationModalState(true);
        }
    }, [publicationId])

    //UseEffect to get general user info of the user seleceted and it's publications.
    useEffect(() => {
        setLoading(true);
        setPublications([]);//we quit all the previous publications. 
        Promise.allSettled([
            getGeneralUserInfoById(userId),
            getAllByAuthUser({ ownerId: userId, ...publicationsBasePagDetails })
        ]).then(values => {
            const [{ value: valueGeneralUser, reason: reasonGeneralUser },
                { value: valueALLByAuth, reason: reasonAllByAuth }] = values;

            //checking user visited general information
            if (valueGeneralUser) {
                setUserVisitedInfo(valueGeneralUser.body);
            } else if (reasonGeneralUser) {
                setNotificationToast({
                    sev: NOTIFICATION_SEVERITIES[1],
                    msg: reasonGeneralUser.message
                });
            }

            //checking user visited's publications.
            if (valueALLByAuth) {
                if (valueALLByAuth.body?.list) {
                    setPublications(valueALLByAuth.body.list);
                    setPublicationsPagDetails(prev => {
                        return { ...prev, ...valueALLByAuth.body.pageInfoDto };
                    })
                } else if (valueALLByAuth.headers) {
                    console.info(valueALLByAuth.headers.get(BACK_HEADERS[0]));
                }
            } else if (reasonAllByAuth) {
                setNotificationToast({
                    sev: NOTIFICATION_SEVERITIES[1],
                    msg: reasonAllByAuth.message
                });
            }
        }).finally(() => {
            setLoading(false);
        });
    }, [userId]);

    /**
    * useEffect to load more user's Publications;
    */
    useEffect(() => {
        if (publicationsFlagPagDetails) {
            const numberOfElementsAlreadyInList = publications.length;
            getAllByAuthUser({ ...publicationsPagDetails, ownerId: userId }).then((data) => {
                if (data.body?.list && data.body.pageInfoDto.totalElements >= numberOfElementsAlreadyInList) {
                    setPublications(prev => [...prev, ...data.body.list]);
                    setPublicationsPagDetails(prev => {
                        return { ...prev, ...data.body.pageInfoDto, };
                    })
                } else if (data.headers) {
                    console.info(data.headers.get(BACK_HEADERS[0]));
                }
            }).catch((error) => {
                setNotificationToast({
                    sev: NOTIFICATION_SEVERITIES[1],
                    msg: error.message
                });
            }).finally(() => {
                setPublicationsFlagPagDetails(false);
            });
        }
    }, [publicationsPagDetails]);


    /**
     * Will handle follow status between authenticated user and the user owner of the page, 
     * where the authenticated user is the followed user.
     * @param {FOLLOWED_STATUS} newFollowStatus - new followStatus.
     * @param {String} followerId - follower's id.
     */
    function updateFollowFollowStatusByFollower({ newFollowStatus, followerId }) {
        updateFollowStatusByFollowerId({ newFollowStatus, id: followerId }).then(data => {
            setUserVisitedInfo(prev => {
                return {
                    ...prev,
                    social: {
                        ...prev.social,
                        followedFollowStatus: data.body.followStatus
                    }
                }
            });
        }).catch(error => {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[1],
                msg: error.message
            })
        });
    }
    /**
     * Function to show a modal with publication selected information.
     * @param {string} id - publication id.
     */
    function showModalPublication(id) {
        setPublicationSelectedId(id)
        setPublicationModalState(true);
    }
    /**
     * To open follow modal.
     * @param {WICH_FOLLOW} wichFollows to know if search follows where the user is the follower or followed
     */
    function handlerFollowModal(wichFollows) {
        setWichFollows(wichFollows);
        setFollowModalState(true);
    }

    //los proxims dos metodos podrian ir en otro componente aparte donde despliege los follow status del userVisited, osea los botones
    /**
    * Function to follow the user selected
    */
    function followHandler() {
        follow(userVisitedInfo.user.id).then(data => {
            setUserVisitedInfo(prev => {
                return {
                    ...prev, social: { ...prev.social, followerFollowStatus: data.body.followStatus }
                }
            });
        }).catch(error => {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[1],
                msg: error.message
            });
        });
    }

    /**
     * Function to stop following the selected user.
     */
    function unfollowHandler() {
        unFollowByFollowedId(userVisitedInfo.user.id).then(data => {
            setUserVisitedInfo(prev => {
                return {
                    ...prev, social: { ...prev.social, followerFollowStatus: FOLLOWED_STATUS[3] }
                }
            });
            console.info(data.body.message)
        }).catch(error => {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[1],
                msg: error.message
            });
        })
    }

    if (loading) {
        return (
            <main className="col-12 col-md-8 col-xl-10">
                <Loading spaceToTake={LOADING_OPTIONS[1]} />
            </main>
        )
    }


    return (
        <main className="col-12 col-md-8 col-xl-10">
            <div className="row p-3">
                <div className="col-12 col-md-5 text-center text-md-end">
                    <UserImageProfile img={userVisitedInfo.user?.image}
                        imgHeight="180px"
                        imgWith="180px" />
                </div>
                <div className="col-12 col-md-7">
                    <UserVisitedSocialInfo
                        userVisitedId={userId}
                        username={userVisitedInfo.user?.username}
                        followerFollowStatus={userVisitedInfo.social?.followerFollowStatus}
                        followedFollowStatus={userVisitedInfo.social?.followedFollowStatus}
                        numberPublications={userVisitedInfo.social?.numberPublications}
                        numberFollowers={userVisitedInfo.social?.numberFollowers}
                        numberFollowed={userVisitedInfo.social?.numberFollowed}
                        updateFollowFollowStatusByFollower={updateFollowFollowStatusByFollower}
                        unfollowHandler={unfollowHandler}
                        followHandler={followHandler}
                        handlerFollowModal={handlerFollowModal}
                    />
                </div>
                <Modal modalState={followModalState} setModalState={setFollowModalState}>
                    <FollowModal setModalState={setFollowModalState} wichFollows={wichFollows} />
                </Modal>
            </div>
            {/**publications*/}
            <div className="row p-3 border d-flex justify-content-center gap-5">
                <Pagination
                    itemsList={publications}
                    pagType={PAG_TYPES[0]}
                    changePage={publicationsChangePage}
                    pagDetails={publicationsPagDetails}
                    ComponentToDisplayItem={(props) => <PublicationCard showModal={showModalPublication}
                        width="w-80 w-sm-75 w-xl-30" {...props} />}
                />
                <Modal modalState={publicationModalState} setModalState={setPublicationModalState}>
                    <PublicationModal setModalState={setPublicationModalState} id={publicationSelectedId} />
                </Modal>
            </div>
        </main>
    )
}
export default UserMainHome;