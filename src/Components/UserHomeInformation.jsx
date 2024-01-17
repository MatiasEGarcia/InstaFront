import { useState } from "react";
import { useParams } from "react-router-dom";
import { findUsersThatWantToFollowYou, follow, unFollowByFollowedId, updateFollowStatusByFollowerId, usersYouWantFollowButIsNotAllowedYet } from "../Service/FollowService";
import { BACK_HEADERS, FOLLOWED_LABEL, FOLLOWED_STATUS, FOLLOWERS_LABEL, LOADING_OPTIONS, NOTIFICATION_SEVERITIES, PUBLICATIONS_LABEL } from "../Util/UtilTexts";
import useAuth from "../hooks/useAuth";
import { useNotification } from "../hooks/useNotification";
import useUserHomeInfo from "../hooks/useUserHomeInfo";
import FollowModal from "./FollowModal";
import Loading from "./Loading";
import Modal from "./Modal";
import UserImageProfile from "./UserImageProfile";
/**
 * 
 * 
 * @param {String} param.userId user id to search. 
 * @returns {JSX.Element} show user general information, like number of followers ,etc.
 */
export default function UsersHomeInformation() {
    const [followModalState, setFollowModalState] = useState(false);//used by Modal component to know if should show the modal or not
    const { userVisited, 
        setUserVisited,
        setFollowModalContent,
        setUserIsFollower, 
        pagDetails, 
        setPagDetails, 
        basePagDetails } = useUserHomeInfo();
    const { auth } = useAuth();
    const { setNotificationToast } = useNotification();
    const { userId } = useParams();
    

    /**
     * function to open follow model with info about users who want to follow you, but you haven't allowed it yet.
     */
    function whoWantToFollowYou() {
        findUsersThatWantToFollowYou({ ...basePagDetails, id: auth.user.id }).then(data => {
            if (data.body?.list) {
                setFollowModalContent(data.body.list);
                setUserIsFollower(false);
                setFollowModalState(true); //to show modal with users list
                setPagDetails({
                    ...pagDetails,
                    ...data.body.pageInfoDto
                })
            } else if (data.headers) {
                setNotificationToast({
                    sev: NOTIFICATION_SEVERITIES[2],
                    msg: data.headers.get(BACK_HEADERS[0])
                });
            }
        }).catch((error) => {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[1],
                msg: error.message
            });
        });
    }

    /**
     * function to open the following model with information about users you want to follow, but are not yet allowed.
     */
    function whoYouWantToFollow() {
        usersYouWantFollowButIsNotAllowedYet({ ...basePagDetails, id: auth.user.id })
            .then(data => {
                if (data.body?.list) {
                    setFollowModalContent(data.body.list);
                    setUserIsFollower(true);
                    setFollowModalState(true);//to show modal with users list
                    setPagDetails({
                        ...pagDetails,
                        ...data.body.pageInfoDto
                    })
                } else if (data.headers) {
                    setNotificationToast({
                        sev: NOTIFICATION_SEVERITIES[2],
                        msg: data.headers.get(BACK_HEADERS[0])
                    });
                }
            }).catch(error => {
                setNotificationToast({
                    sev: NOTIFICATION_SEVERITIES[1],
                    msg: error.message
                });
            });
    }

    /**
    * Function to follow the user selected
    */
    function followHanlder() {
        follow(userVisited.user.id).then(data => {
            setUserVisited({ ...userVisited, social: { ...userVisited.social, followStatus: data.body.followStatus } });
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
        unFollowByFollowedId(userVisited.user.id).then(data => {
            setUserVisited({ ...userVisited, social: { ...userVisited.social, followStatus: data.body.followStatus } });
        }).catch(error => {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[1],
                msg: error.message
            });
        });
    }

    /**
     * Will handle follow status between authenticated user and the user owner of the page, 
     * where the authenticated user is the followed user.
     * @param {FOLLOWED_STATUS} newFollowStatus - new followStatus.
     * @param {String} followerId - follower's id.
     */
    function updateFollowFollowStatusByFollower({ newFollowStatus, followerId }) {
        updateFollowStatusByFollowerId({ newFollowStatus, id: followerId }).then(data => {
            setUserVisited({
                ...userVisited,
                social: {
                    ...userVisited.social,
                    followedFollowStatus: data.body.followStatus
                }
            });
        }).catch(error => {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[1],
                msg: error.message
            })
        });
    }





    return (
        <div className="row p-3">
            <div className="col-12 col-md-5 text-center text-md-end">
                <UserImageProfile img={userVisited.user?.image}
                    imgHeight="180px"
                    imgWith="180px" />
            </div>
            <div className="col-12 col-md-7">
                <div className="mt-3 w-100 w-lg-80 d-flex">
                    <h3>{userVisited.user?.username}</h3>
                    {auth.user.userId !== userId &&   //if auth user is the same as the one in the page I will not show this
                        <div className="ms-3 d-flex  gap-2">
                            {/**Follow status where authenticated user is the follower */}
                            {userVisited.social?.followerFollowStatus === FOLLOWED_STATUS[0] &&
                                <button className="btn btn-light" onClick={unfollowHandler}>Unfollow</button>}
                            {userVisited.social?.followerFollowStatus === FOLLOWED_STATUS[1] &&
                                <span className="btn btn-light">Follow request was rejected</span>}
                            {userVisited.social?.followerFollowStatus === FOLLOWED_STATUS[2] &&
                                <span className="btn btn-light">Follow request in proccess</span>}
                            {userVisited.social?.followerFollowStatus === FOLLOWED_STATUS[3] &&
                                <button className="btn btn-light" onClick={followHanlder}>Follow</button>}

                            {/**Follow status where authenticated user is the followed */}
                            {userVisited.social?.followedFollowStatus === FOLLOWED_STATUS[0] &&
                                <button className="btn btn-light"
                                    onClick={() => updateFollowFollowStatusByFollower({ newFollowStatus: FOLLOWED_STATUS[1], followerId: userId })}>
                                    Cancel follow permision
                                </button>}
                            {userVisited.social?.followedFollowStatus === FOLLOWED_STATUS[1] ||
                                userVisited.social?.followedFollowStatus === FOLLOWED_STATUS[2]
                                ? <button className="btn btn-light"
                                    onClick={() => updateFollowFollowStatusByFollower({ newFollowStatus: FOLLOWED_STATUS[0], followerId: userId })}>
                                    Allow to follow you
                                </button>
                                : ''
                            }

                        </div>
                    }
                    {auth.user.id === userId &&
                        <div className="ms-3 d-flex gap-2">
                            <button className="btn btn-light" onClick={whoWantToFollowYou}>Want to follow you</button>
                            <button className="btn btn-light" onClick={whoYouWantToFollow}>You want to follow</button>
                        </div>
                    }
                </div>
                <div className="mt-3 w-100 w-lg-80 d-flex justify-content-between">
                    <p>{userVisited.social?.numberPublications} {PUBLICATIONS_LABEL}</p>
                    <p>{userVisited.social?.numberFollowers} {FOLLOWERS_LABEL}</p>
                    <p>{userVisited.social?.numberFollowed} {FOLLOWED_LABEL}</p>
                </div>
            </div>
            <Modal modalState={followModalState} setModalState={setFollowModalState}>
                <FollowModal setModalState={setFollowModalState} />
            </Modal>
        </div>
    )
} 