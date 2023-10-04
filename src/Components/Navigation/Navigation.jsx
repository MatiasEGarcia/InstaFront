import LeftNavigation from "./LeftNavigation";
import StickyBottomIconNavigation from "./StickyBottomIconNavigation";
import { ACTION_NO_EXIST, LIKE, NOTIFICATION_SEVERITIES, TYPE_NAV } from "../../Util/UtilTexts";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { searchUsersByOneCondition } from "../../Service/UserService";
import { useNotification } from "../../hooks/useNotification";
import { changeUserVisibility } from "../../Service/UserService";
import { follow } from "../../Service/FollowService";

/**
 * 
 * @param {Object} param0 - The component props.
 * @param {String} param.typeNavigation -which navigator is needed
 * @returns {JSX.Element} - One of the posibles types of navigations
 */
export default function Navigation({ typeNavigation }) {
    const [showPopover, setShowPopover] = useState('');//should containe name of the popover to show, if is empty then no one.
    const [username, setUsername] = useState('');
    const [usersFound, setUsersFound] = useState([]);
    const setNotification = useNotification();
    const { auth, setAuth, logout } = useAuth();

    function hidePopover() {
        /**
        * After a second it runs this, 
        * but if the mouse re-entered the popover, then it won't close, it's to give the user time to get from the icon to the popover.
        */
        setTimeout(() => {
            setShowPopover('');
        }, 500);
    }

    function setUserVisibility() {
        changeUserVisibility().then((data) => {
            setAuth({ ...auth, user: data.body });
            setNotification({
                sev: NOTIFICATION_SEVERITIES[0],//success
                msg: "visibility changed",
            })
        }).catch((error) => {
            setNotification({
                sev: NOTIFICATION_SEVERITIES[1],//error
                msg: error.message,
            })
        })
    }

    useEffect(() => {
        if (username.length !== 0) {
            searchUsersByOneCondition({
                column: 'username',
                value: username,
                operation: LIKE,
            }).then((data) => {
                if (data.body?.list !== undefined) {
                    setUsersFound(data.body.list);
                } else {
                    console.log(data.headers.get('moreInfo'))//moreInfo: name of the header with the more info
                }
            }).catch((error) => {
                setNotification({
                    sev: NOTIFICATION_SEVERITIES[1],//error
                    msg: error.message,
                })
            })
        } else {
            //to reset usersFoundList
            setUsersFound([]);
        }
    }, [username]);

    function saveFollow(followedId) {
        follow(followedId).then((data) => {
            setNotification({
                sev: NOTIFICATION_SEVERITIES[0], //success
                msg: `follow saved, current status is ${data.body.followStatus}`
            });
        }).catch((error => {
            setNotification({
                sev: NOTIFICATION_SEVERITIES[1], //error
                msg: error.message
            });
        })).finally()
    }


    switch (typeNavigation) {
        case TYPE_NAV[0]:
            return <LeftNavigation
                username={username}
                setUsername={setUsername}
                usersFound={usersFound}
                logout={logout}
                showPopover={showPopover}
                setShowPopover={setShowPopover}
                hidePopover={hidePopover}
                userVisibiliy={auth.user.visible}
                setUserVisibility={setUserVisibility}
                saveFollow={saveFollow} />
        case TYPE_NAV[1]:
            return <StickyBottomIconNavigation
                username={username}
                setUsername={setUsername}
                usersFound={usersFound}
                logout={logout}
                showPopover={showPopover}
                setShowPopover={setShowPopover}
                hidePopover={hidePopover}
                userVisibiliy={auth.user.visible}
                setUserVisibility={setUserVisibility}
                setFollow={saveFollow} />
        default:
            throw new Error(ACTION_NO_EXIST);
    }
}