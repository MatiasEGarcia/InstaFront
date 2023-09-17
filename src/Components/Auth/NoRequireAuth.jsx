import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { useNotification } from "../../hooks/useNotification";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useCheckUserEffect from "../../hooks/useCheckUserEffect";
import Loading from "../Loading";

/**
 * will check if a user is authenticated. If is then will send it to /home and avoid all the components
 * inside of this component, if not the let it continue.
 * 
 * @returns {JSX.Element} 
 */
export default function noRequireAuth(){
    console.log("entrando en noRequireAuth")
    const {auth, setAuth} = useAuth();
    const [loading, setLoading] = useState(true);
    const setNotification = useNotification();
    const location = useLocation();


    useCheckUserEffect({
        auth,
        setAuth,
        setNotification,
        setLoading
    });

    if(loading){
        return(
            <Loading/>
        )
    }

    return(
        auth?.user
        ? <Navigate to="/home" state={{from:location}} replace/>
        : <Outlet/>
    )

}