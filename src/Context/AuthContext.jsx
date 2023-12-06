import { createContext, useEffect, useState } from "react";
import { RefreshTokenException } from "../Errors/Errors";
import { logout as logoutFromService } from "../Service/UserService";
import { BACK_HEADERS, NOTIFICATION_SEVERITIES } from "../Util/UtilTexts";
import { useNotification } from "../hooks/useNotification";
import { getPersonalNotifications } from "../Service/NotificationService";

const AuthContext = createContext();
let stompClient = null;
export function AuthProvider({ children }) {
    const [auth, setAuth] = useState({});
    const { setNotificationToast, setNotificationList } = useNotification();

    function logout() {
        logoutFromService().then((data) => {
            setAuth({});
        }).catch((error) => {
            if (error instanceof RefreshTokenException) {
                //success because the tokens are not valid, which is what 
                //the user wanted from the beginning so it's the same
                setAuth({});
            } else {
                setNotificationToast({
                    sev: NOTIFICATION_SEVERITIES[1], //Error
                    msg: error.message
                })
            }
        })
    }

    /**
     * Getting personal notifications from server is a user is authenticated
     */
    useEffect(() => {
        if (auth.user) {
            getPersonalNotifications({}).then((data) => {
                if (data.body?.list) {
                    setNotificationList([...data.body.list]);
                } else if (data.headers) {//in case that there are not notifi
                    setNotificationToast({
                        sev: NOTIFICATION_SEVERITIES[2],
                        msg: data.headers.get(BACK_HEADERS[0])
                    })
                }
            }).catch((error) => {
                setNotificationToast({
                    sev: NOTIFICATION_SEVERITIES[1],//error
                    msg: error.message
                })
            });
        }
    }, [auth]);
    return (
        <AuthContext.Provider value={{ auth, setAuth, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;