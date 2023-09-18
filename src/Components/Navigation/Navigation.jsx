import LeftNavigation from "./LeftNavigation";
import StickyBottomIconNavigation from "./StickyBottomIconNavigation";
import { ACTION_NO_EXIST, LIKE, NOTIFICATION_SEVERITIES, TYPE_NAV } from "../../Util/UtilTexts";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { searchUsersByOneCondition } from "../../Service/UserService";
import { useNotification } from "../../hooks/useNotification";

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
    const { logout } = useAuth;

    function hidePopover() {
        /**
        * After a second it runs this, 
        * but if the mouse re-entered the popover, then it won't close, it's to give the user time to get from the icon to the popover.
        */
        setTimeout(() => {
            setShowPopover('');
        }, 500);
    }

    useEffect(() => {
        if (username.length !== 0) {
            searchUsersByOneCondition({
                column: 'username',
                value: username,
                operation: LIKE,
            }).then((data) => {
                if (data.list !== undefined) {
                    setUsersFound(data.list);
                }
            }).catch((error) => {
                setNotification({
                    sev: NOTIFICATION_SEVERITIES[1],
                    msg: error.message,
                })
            })
        }else{
            //to reset usersFoundList
            setUsersFound([]);
        }
    }, [username]);


    switch (typeNavigation) {
        case TYPE_NAV[0]:
            return <LeftNavigation
                username={username}
                setUsername={setUsername}
                usersFound={usersFound}
                logout={logout}
                showPopover={showPopover}
                setShowPopover={setShowPopover}
                hidePopover={hidePopover} />
        case TYPE_NAV[1]:
            return <StickyBottomIconNavigation
                username={username}
                setUsername={setUsername}
                usersFound={usersFound}
                logout={logout}
                showPopover={showPopover}
                setShowPopover={setShowPopover}
                hidePopover={hidePopover} />
        default:
            throw new Error(ACTION_NO_EXIST);
    }
}