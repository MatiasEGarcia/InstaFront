import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { LOADING_OPTIONS } from "../../Util/UtilTexts";
import useAuth from "../../hooks/useAuth";
import useCheckUserEffect from "../../hooks/useCheckUserEffect";
import { useNotification } from "../../hooks/useNotification";
import Loading from "../Loading";

/**
 * will check if a user is authenticated. If is then will send it to /home and avoid all the components
 * inside of this component, if not the let it continue.
 * 
 * @returns {JSX.Element} 
 */
export default function noRequireAuth(){
    const [loading, setLoading] = useState(true);
    const {auth, setAuth} = useAuth();
    const {setNotificationToast} = useNotification();
    const location = useLocation();

    useCheckUserEffect({
        auth,
        setAuth,
        setNotificationToast,
        setLoading
    });

    if(loading){
        return(
            <Loading spaceToTake={LOADING_OPTIONS[0]}/>
        )
    }

    return(
        auth?.user
        ? <Navigate to="/home" state={{from:location}} replace/>
        : <Outlet/>
    )

}