import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findUsersThatWantToFollowYou, follow, unFollow, usersYouWantFollowButIsNotAllowedYet } from "../Service/FollowService";
import { getGeneralUserInfo } from "../Service/UserService";
import {
    FOLLOWED_LABEL, FOLLOWED_STATUS, FOLLOWERS_LABEL,
    LOADING_OPTIONS,
    NOTIFICATION_SEVERITIES, PUBLICATIONS_LABEL
} from "../Util/UtilTexts";
import useAuth from "../hooks/useAuth";
import { useNotification } from "../hooks/useNotification";
import Loading from "./Loading";
import Modal from "./Modal";
import PublicationModal from "./PublicationModal";
import UsersHomePublications from "./UserHomePublications";
import UserImageProfile from "./UserImageProfile";
import FollowModal from "./FollowModal";

const basePagDetail = {
    pageNo: 0,
    pageSize: 10,
    totalPages : undefined,
    totalElements : undefined,
    sortField: undefined,
    sortDir : undefined
}

//cuando me comunique con el server esto lo borro
const contentModalPublication = {
    username: "matias",
    date: 22 - 5 - 23,
    description: "Some quick example text to build on the card title and make up thebulk of the card's content. "
}
/**
 * Main component for user home page. where should be its publications,followers ,etc.
 * 
 * @returns {JSX.Element} - show every user main page.
 */
function UserMainHome() {
    const [publicationModalState, setPublicationModalState] = useState(false);//used by Modal component to know if should show the modal or not
    const [followModalState, setFollowModalState] = useState(false);//used by Modal component to know if should show the modal or not
    const [userIsFollower, setUserIsFollower] = useState();// used in follow Modal as flag to know if I should show follow's follower or followed user.
    const { setNotificationToast } = useNotification();
    const navigate = useNavigate();
    const { auth } = useAuth();
    const { userId } = useParams();
    const [loading, setLoading] = useState(false);
    const [userVisited, setUserVisited] = useState({}); //user owner of this page
    const [followModalContent, setFollowModalContent] = useState([]); //list of follows

    useEffect(() => {
        setLoading(true);
        getGeneralUserInfo(userId).then((data) => {
            setUserVisited(data.body);
        }).catch((error) => {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[1],
                msg: error.message
            });
            navigate("/home");
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    /**
     * Function to show a modal with publication selected information.
     * @param {string} id - publication id.
     */
    function showPublicationModal(id) {
        setModalState(true);
    }

    /**
     * Function to follow the user selected
     */
    function followHanlder() {
        follow(userVisited.user.userId).then(data => {
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
        unFollow(userVisited.user.userId).then(data => {
            setUserVisited({ ...userVisited, social: { ...userVisited.social, followStatus: data.body.followStatus } });
        }).catch(error => {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[1],
                msg: error.message
            });
        });
    }


    /**
     * function to open follow model with info about users who want to follow you, but you haven't allowed it yet
     */
    function whoWantToFollowYou(){
        findUsersThatWantToFollowYou({...basePagDetail ,authUserId: auth.user.userId}).then(data => {
            if(data.body?.list){
                setFollowModalContent(data.body.list);
                setUserIsFollower(false);
                setFollowModalState(true); //to show modal with users list
            }else if(data.headers){
                setNotificationToast({
                    sev: NOTIFICATION_SEVERITIES[2],
                    msg: data.headers.get('moreInfo')
                });
            }
        }).catch((error) => {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[1],
                msg: error.message
            });
        });
    }

    function whoYouWantToFollow(){
        usersYouWantFollowButIsNotAllowedYet({...basePagDetail ,authUserId: auth.user.userId})
            .then(data => {
                if(data.body?.list){
                    setFollowModalContent(data.body.list);
                    setUserIsFollower(true);
                    setFollowModalState(true);
                }else if(data.headers){
                    setNotificationToast({
                        sev:NOTIFICATION_SEVERITIES[2],
                        msg: data.headers.get('moreInfo')
                    });
                }
            }).catch(error => {
                setNotificationToast({
                    sev: NOTIFICATION_SEVERITIES[1],
                    msg:error.message
                });
            });
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
                    <UserImageProfile img={userVisited.user?.image}
                        imgHeight="180px"
                        imgWith="180px" />
                </div>
                <div className="col-12 col-md-7">
                    <div className="mt-3 w-100 w-lg-80 d-flex">
                        <h3>{userVisited.user?.username}</h3>
                        {auth.user.userId !== userId &&   //if auth user is the same as the one in the page I will not show this
                            <div className="ms-3 d-flex  gap-2">
                                {userVisited.social?.followStatus === FOLLOWED_STATUS[0] &&
                                    <button className="btn btn-light" onClick={unfollowHandler}>Unfollow</button>}
                                {userVisited.social?.followStatus === FOLLOWED_STATUS[1] &&
                                    <span className="btn btn-light">Follow request was rejected</span>}
                                {userVisited.social?.followStatus === FOLLOWED_STATUS[2] &&
                                    <span className="btn btn-light">Follow request in proccess</span>}
                                {userVisited.social?.followStatus === FOLLOWED_STATUS[3] &&
                                    <button className="btn btn-light" onClick={followHanlder}>Follow</button>}
                                <button className="btn btn-light">Send a message</button>
                            </div>
                        }
                        {auth.user.userId === userId &&
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
            </div>
            <UsersHomePublications showModal={showPublicationModal} userOwnerId={userId} />
            <Modal modalState={publicationModalState} setModalState={setPublicationModalState}>
                <PublicationModal setModalState={setPublicationModalState} contentModal={contentModalPublication} />
            </Modal>
            <Modal modalState={followModalState} setModalState={setFollowModalState}>
                 <FollowModal setModalState={setFollowModalState} contentModalList={followModalContent} userIsFollower={userIsFollower}/>     
            </Modal>
        </main>
    )
}

export default UserMainHome;