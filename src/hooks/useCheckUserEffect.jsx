import { useEffect } from "react";
import { NOTIFICATION_SEVERITIES, NOTIFICATION_TYPE } from "../Util/UtilTexts";
import { getGeneralInfo } from "../Service/UserService";

/**
 * Use effect that will be executed in the load of the component , [].
 * It work is to chcek
 * 
 * @param {Object} props - object to ckeck if there was a user authenticated.
 * @param {Object} props.auth - object that have the user authenticated if there is.  
 * @param {Function} props.setAuth - function to set the authenticated user
 * @param {Function} props.setNotification - function to set a notification as response to the user.
 * @param {Function} props.setLoading - functon to left loading state. 
 */
export default function useCheckUserEffect({
    auth,
    setAuth,
    socketConnected,
    setNotificationToast,
    setLoading
}) {
    /**
     * if the user signs in but at any moment reload the page, then we will lose the auth state the user will sign in again,
     * with this I try to avoid that, if the auth is null but there is an authToken we will get the user data.
     */
    useEffect(() => {
        if (!auth?.user && localStorage.getItem("authToken")) {
            getGeneralInfo(socketConnected).then((data) => {
                setAuth({ ...auth, user: data.body });
            }).catch((error) => {
                setNotificationToast({
                    sev:NOTIFICATION_SEVERITIES[1],
                    msg:error.message,
                });
            }).finally(() => {
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    },[]);
}