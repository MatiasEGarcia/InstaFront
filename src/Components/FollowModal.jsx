import { useEffect, useRef, useState } from "react";
import { XSquare } from "react-bootstrap-icons";
import { PAG_TYPES, WICH_FOLLOW, LOADING_OPTIONS, NOTIFICATION_SEVERITIES, BACK_HEADERS, FOLLOWED_STATUS } from "../Util/UtilTexts";
import FollowTr from "./FollowTr";
import Pagination from "./Pagination";
import { usePag } from "../hooks/usePag";
import Loading from "./Loading";
import { findUsersThatWantToFollowYou, usersYouWantFollowButIsNotAllowedYet, updateFollowStatusByFollowId } from "../Service/FollowService";
import useAuth from "../hooks/useAuth";
import { useNotification } from "../hooks/useNotification";

const followsBasePagDetail = {
    pageNo: 0,
    pageSize: 10,
    totalPages: undefined,
    totalElements: undefined,
    sortField: undefined,
    sortDir: undefined
};

/**
 * @param {Function} param.setModalState - function to close currently modal.
 * @param {WICH_FOLLOW} param.wichFollows to know if It should search follow where the user is follower or followed.
 * @returns {JSX.Element}  Component with the content that will be display when we want to see the follow info in a modal.
 */
export default function FollowModal({
    setModalState, wichFollows
}) {
    //popover to show follow status dropdown
    const [showDropdown, setShowDropdown] = useState(''); // should contain the id of the follow
    const [loading, setLoading] = useState(true);
    const [userIsFollower, setUserIsFollower] = useState();
    const { elements: follows, //list of follows
        setElements: setFollows,
        pagDetails: followsPagDetails,
        setPagDetails: setFollowsPagDetails,
        flagPagDetails: flagFollowsPagDetails,
        setFlagPagDetails: setFlagFollowsPagDetails,
        changePage: followsChangePage
    } = usePag({ ...followsBasePagDetail });
    const refFollowCardBody = useRef();
    const { setNotificationToast } = useNotification();
    const { auth } = useAuth();

    /**
     * To get follow records at the beggining.
     */
    useEffect(() => {
        if (wichFollows === WICH_FOLLOW.FOLLOWED) {
            findUsersThatWantToFollowYou({ ...followsBasePagDetail, id: auth.user.id }).then(data => {
                if (data.body?.list) {
                    setFollows(data.body.list);
                    setUserIsFollower(false);
                    setFollowsPagDetails({
                        ...followsPagDetails,
                        ...data.body.pageInfoDto
                    })
                } else if (data.headers) {
                    console.info(data.headers.get(BACK_HEADERS[0]));
                }
            }).catch((error) => {
                setNotificationToast({
                    sev: NOTIFICATION_SEVERITIES[1],
                    msg: error.message
                });
            });
        } else if (wichFollows === WICH_FOLLOW.FOLLOWER) {
            usersYouWantFollowButIsNotAllowedYet({ ...followsBasePagDetail, id: auth.user.id })
                .then(data => {
                    if (data.body?.list) {
                        setFollows(data.body.list);
                        setUserIsFollower(true);
                        setFollowsPagDetails({
                            ...followsPagDetails,
                            ...data.body.pageInfoDto
                        })
                    } else if (data.headers) {
                        console.info(data.headers.get(BACK_HEADERS[0]));
                    }
                }).catch(error => {
                    setNotificationToast({
                        sev: NOTIFICATION_SEVERITIES[1],
                        msg: error.message
                    });
                });
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (flagFollowsPagDetails) {
            const numberOfElementsAlreadyInList = follows.length;
            if (wichFollows === WICH_FOLLOW.FOLLOWED) {
                findUsersThatWantToFollowYou({ ...followsPagDetails, id: auth.user.id }).then(data => {
                    if (data.body?.list && data.body.pageInfoDto.totalElements >= numberOfElementsAlreadyInList) {
                        setFollows(prev => [...prev, ...data.body.list]);
                        setUserIsFollower(false);
                        setFollowsPagDetails({
                            ...followsPagDetails,
                            ...data.body.pageInfoDto
                        })
                    } else if (data.headers) {
                        console.info(data.headers.get(BACK_HEADERS[0]));
                    }
                }).catch((error) => {
                    setNotificationToast({
                        sev: NOTIFICATION_SEVERITIES[1],
                        msg: error.message
                    });
                });
            } else if (wichFollows === WICH_FOLLOW.FOLLOWER) {
                usersYouWantFollowButIsNotAllowedYet({ ...followsPagDetails, id: auth.user.id })
                    .then(data => {
                        if (data.body?.list && data.body.pageInfoDto.totalElements >= numberOfElementsAlreadyInList) {
                            setFollows(prev => [...prev, ...data.body.list]);
                            setUserIsFollower(true);
                            setFollowsPagDetails({
                                ...followsPagDetails,
                                ...data.body.pageInfoDto
                            })
                        } else if (data.headers) {
                            console.info(data.headers.get(BACK_HEADERS[0]));
                        }
                    }).catch(error => {
                        setNotificationToast({
                            sev: NOTIFICATION_SEVERITIES[1],
                            msg: error.message
                        });
                    });
            }
            setFlagFollowsPagDetails(false);
        }
    }, [followsPagDetails]);


    /**
     * Function to change follow status in some record.
     * 
     * @param {FOLLOWED_STATUS} newFollowStatus new follow status in follow record. 
     * @param {String} followId follow's id( to know which follow record update).
     */
    function handlerFollowStatusUpdate({ newFollowStatus, followId }) {
        updateFollowStatusByFollowId({ newFollowStatus, id: followId }).then(data => {
            const newFollowModalList = follows.map((follow) => {
                if (follow.followId === data.body.followId) {
                    follow.followStatus = data.body.followStatus;
                }
                return follow;
            });
            // to have updated info in the modal.
            setFollows([...newFollowModalList]);

            //if the status is ACCEPTED then I will add 1 more in numberFollowers of the userVisited.(it should be authenticated user)
            if (data.body.followStatus === FOLLOWED_STATUS[0]) {
                const numberFollowersNum = Number(userVisited.social.numberFollowers);
                setUserVisited({
                    ...userVisited,
                    social: {
                        ...userVisited.social,
                        numberFollowers: numberFollowersNum + 1,
                    }
                });
            }
        }).catch(error => {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[1],
                msg: error.message
            })
        });
    }

    /**
     * Function to open the change status dropdown, and close if is already open. 
     * @param {String} followId - if of the follow record/entity 
     */
    function openAndCloseDropdown(followId) {
        if (showDropdown === followId) {
            setShowDropdown('');
        } else {
            setShowDropdown(followId)
        }
    }

    function closeModal() {
        setModalState(prev => !prev);
    }

    if (loading) {
        return (
            <div className="w-80 w-md-35 h-80 d-flex justify-content-center">
                <div className="card w-100 h-100 border position-relative">
                    <Loading spaceToTake={LOADING_OPTIONS[1]} />
                </div>
            </div>
        )
    }

    return (
        <div className="w-80 w-md-35 h-80 d-flex justify-content-center">
            <div className="card w-100 h-100 border position-relative">
                <div className="card-header text-center">
                    <h2>List of users</h2>
                </div>
                <div className="card-body overflow-auto" ref={refFollowCardBody}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">User</th>
                                <th scope="col">Follow status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Pagination
                                itemsList={follows}
                                pagType={PAG_TYPES[0]}
                                pagDetails={followsPagDetails}
                                changePage={followsChangePage}
                                observerRoot={refFollowCardBody.current}
                                ComponentToDisplayItem={(props) => <FollowTr
                                    openAndCloseDropdown={openAndCloseDropdown}
                                    showDropdown={showDropdown}
                                    handlerFollowStatusUpdate={handlerFollowStatusUpdate}
                                    userIsFollower={userIsFollower} {...props} />} />
                        </tbody>
                    </table>
                </div>
                <XSquare size={30} className="cursor-pointer-hover m-1 position-absolute top-0 end-0"
                    onClick={closeModal} />
            </div>
        </div>

    )
}