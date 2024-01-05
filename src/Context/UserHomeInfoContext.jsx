import { createContext, useState } from "react";
import { FOLLOWED_STATUS, NOTIFICATION_SEVERITIES } from "../Util/UtilTexts";
import { updateFollowStatusByFollowId } from "../Service/FollowService";
import { useNotification } from "../hooks/useNotification";

const UserHomeInfoConext = createContext();

export function UserHomeInfoProvider({children}){
    const [userVisited, setUserVisited] = useState({});//user owner of userHomeInformation page
    const [userIsFollower, setUserIsFollower] = useState(); // used in followTr as flag to know if I should show follow's follower or followed user.
    const [followModalContent, setFollowModalContent] = useState([]);//list of follows
    const {setNotificationToast} = useNotification();


    /**
     * Function to change follow status in some record.
     * 
     * @param {FOLLOWED_STATUS} newFollowStatus new follow status in follow record. 
     * @param {String} followId follow's id( to know which follow record update).
     */
    function handlerFollowStatusUpdate({newFollowStatus, followId}){
        updateFollowStatusByFollowId({newFollowStatus, followId}).then(data => {
            const newFollowModalList = followModalContent.map((follow) => {
                if(follow.followId === data.body.followId){
                    follow.followStatus = data.body.followStatus;
                }
                return follow;
            });
            // to have updated info in the modal.
            setFollowModalContent([...newFollowModalList]);

            //if the status is ACCEPTED then I will add 1 more in numberFollowers of the userVisited.(it should be authenticated user)
            if(data.body.followStatus === FOLLOWED_STATUS[0]){
                const numberFollowersNum = Number(userVisited.social.numberFollowers);
                setUserVisited({
                    ...userVisited,
                    social:{
                        ...userVisited.social,
                        numberFollowers : numberFollowersNum + 1,
                    }
                });
            }
        }).catch( error => {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[1],
                msg: error.message
            })        
        });
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
        }}>
            {children}
        </UserHomeInfoConext.Provider>
    )
}

export default UserHomeInfoConext;