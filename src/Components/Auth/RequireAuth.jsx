import { useState} from "react";
import useAuth from "../../hooks/useAuth";
import { useNotification } from "../../hooks/useNotification";
import { useLocation, Outlet } from "react-router-dom";
import Loading from "../Loading";
import { Navigate } from "react-router-dom";
import useCheckUserEffect from "../../hooks/useCheckUserEffect";
import { LOADING_OPTIONS } from "../../Util/UtilTexts";

/**
 * This component will see if a user is authenticated,  
 * if is authenticated then will let it continue to the destination route, 
 * if not then will send it to "/",
 * @returns {JSX.Element} 
 */
export default function RequireAuth(){
    const {auth, setAuth, socketConnected} = useAuth();
    const [loading, setLoading] = useState(true);
    const {setNotification} = useNotification();
    const location = useLocation();

    useCheckUserEffect({
        auth,
        setAuth,
        socketConnected,
        setNotification,
        setLoading
    });

    if (loading) {
        return (
            <Loading spaceToTake={LOADING_OPTIONS[0]}/>
        )
    }

    return(
        auth?.user
        ? <Outlet/>
        : <Navigate to="/" state={{from:location}} replace/>
    );

}