import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { LOADING_OPTIONS } from "../../Util/UtilTexts";
import useAuth from "../../hooks/useAuth";
import useCheckUserEffect from "../../hooks/useCheckUserEffect";
import { useNotification } from "../../hooks/useNotification";
import Loading from "../Loading";

/**
 * This component will see if a user is authenticated,  
 * if is authenticated then will let it continue to the destination route, 
 * if not then will send it to "/",
 * @returns {JSX.Element} 
 */
export default function RequireAuth() {
    const [loading, setLoading] = useState(true);
    const { auth, setAuth } = useAuth();
    const { setNotificationToast } = useNotification();
    const location = useLocation();

    useCheckUserEffect({
        auth,
        setAuth,
        setNotificationToast,
        setLoading
    });


    if (loading) {
        return (
            <Loading spaceToTake={LOADING_OPTIONS[0]} />
        )
    }

    return (
        auth?.user
            ? <Outlet />
            : <Navigate to="/" state={{ from: location }} replace />
    );

}