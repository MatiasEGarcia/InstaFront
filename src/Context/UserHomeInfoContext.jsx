import { createContext, useState, useEffect } from "react";
import { FOLLOWED_STATUS, NOTIFICATION_SEVERITIES,LOADING_OPTIONS } from "../Util/UtilTexts";
import { updateFollowStatusByFollowId, 
    findUsersThatWantToFollowYou, 
    usersYouWantFollowButIsNotAllowedYet} from "../Service/FollowService";
import { getGeneralUserInfoById } from "../Service/UserService";
import { useNotification } from "../hooks/useNotification";
import { usePag } from "../hooks/usePag";
import { useNavigate,useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import useAuth from "../hooks/useAuth";

const basePagDetail = {
    pageNo: 0,
    pageSize: 10,
    totalPages: undefined,
    totalElements: undefined,
    sortField: undefined,
    sortDir: undefined
}


const UserHomeInfoConext = createContext();

export function UserHomeInfoProvider({ children }) {
    console.log("entrando en el userHomeProvider")
    const [loading, setLoading] = useState(false);
    const [userVisited, setUserVisited] = useState({});//user owner of userHomeInformation page
    const [userIsFollower, setUserIsFollower] = useState(); // used in followTr as flag to know if I should show follow's follower or followed user.
    const { setNotificationToast } = useNotification();
    const { elements: followModalContent, //list of follows
        setElements: setFollowModalContent,
        pagDetails,
        setPagDetails,
        basePagDetails,
        flagPagDetails,
        setFlagPagDetails,
        changePage } = usePag({ ...basePagDetail });
    const navigate = useNavigate();
    const { auth } = useAuth();
    const { userId } = useParams();

    //UseEffect to get general user info of the user seleceted
    useEffect(() => {
        setLoading(true);
        getGeneralUserInfoById(userId).then((data) => {
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
    }, [userId]);

    /**
     * This useEffect will be execute when the user wants the follow records from the next page.
     * First will be called one of these methods {@link whoWantToFollowYou} or {@link whoYouWantToFollow}
     */
    useEffect(() => {
        if (flagPagDetails) {
            if (userIsFollower === false) { //with this I know what function a need to do to get more follow records
                findUsersThatWantToFollowYou({ ...pagDetails, id: auth.user.id }).then(data => {
                    const numberOfElementsAlreadyInModal = followModalContent.length;//to don't keep adding last users when they are already in the modal list.
                    if (data.body?.list && data.body.pageInfoDto.totalElements >= numberOfElementsAlreadyInModal) {
                        //I want to have follow records from prev request and new request
                        setFollowModalContent([...followModalContent, ...data.body.list]);
                        setPagDetails({
                            ...pagDetails,
                            ...data.body.pageInfoDto
                        });
                    }
                }).catch((error) => {
                    setNotificationToast({
                        sev: NOTIFICATION_SEVERITIES[1],
                        msg: error.message
                    });
                });
            } else {
                usersYouWantFollowButIsNotAllowedYet({ ...pagDetails, id: auth.user.id })
                    .then(data => {
                        const numberOfElementsAlreadyInModal = followModalContent.length;//to don't keep adding last users when they are already in the modal list.
                        if (data.body?.list && data.body.pageInfoDto.totalElements > numberOfElementsAlreadyInModal) {
                            //I want to have follow records from prev request and new request
                            setFollowModalContent([...followModalContent, data.body.list]);
                            setPagDetails({
                                ...pagDetails,
                                ...data.body.pageInfoDto
                            })
                        }
                    }).catch(error => {
                        setNotificationToast({
                            sev: NOTIFICATION_SEVERITIES[1],
                            msg: error.message
                        });
                    });
            }
            setFlagPagDetails(false);
        }
    }, [pagDetails]);

    /**
     * Function to change follow status in some record.
     * 
     * @param {FOLLOWED_STATUS} newFollowStatus new follow status in follow record. 
     * @param {String} followId follow's id( to know which follow record update).
     */
    function handlerFollowStatusUpdate({ newFollowStatus, followId }) {
        updateFollowStatusByFollowId({ newFollowStatus, id: followId }).then(data => {
            const newFollowModalList = followModalContent.map((follow) => {
                if (follow.followId === data.body.followId) {
                    follow.followStatus = data.body.followStatus;
                }
                return follow;
            });
            // to have updated info in the modal.
            setFollowModalContent([...newFollowModalList]);

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


    if (loading) {
        return (
            <div className="row p-3">
                <Loading spaceToTake={LOADING_OPTIONS[1]} />
            </div>
        )
    }



    return (
        <UserHomeInfoConext.Provider value={{
            userVisited,
            setUserVisited,
            userIsFollower,
            setUserIsFollower,
            handlerFollowStatusUpdate,
            followModalContent,
            setFollowModalContent,
            pagDetails,
            setPagDetails,
            flagPagDetails,
            basePagDetails,
            setFlagPagDetails,
            changePage
        }}>
            {children}
        </UserHomeInfoConext.Provider>
    )
}

export default UserHomeInfoConext;