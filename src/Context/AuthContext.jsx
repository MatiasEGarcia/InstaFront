import { createContext, useState } from "react";
import {useNotification} from "../hooks/useNotification";
import { logout as logoutFromService } from "../Service/UserService";
import { NOTIFICATION_SEVERITIES } from "../Util/UtilTexts";
import { RefreshTokenException } from "../Errors/Errors";

const AuthContext = createContext();


export function AuthProvider({ children }) {
    const [auth, setAuth] = useState({});
    const setNotification = useNotification();

    function logout() {
        logoutFromService().then((data) => {
            setAuth({});
        }).catch((error) => {
            if(error instanceof RefreshTokenException){
                //success because the tokens are not valid, which is what 
                //the user wanted from the beginning so it's the same
                setAuth({});
            }else{
                setNotification({
                    sev: NOTIFICATION_SEVERITIES[1], //Error
                    msg:error.message
                })
            }
        })
    }


    return (
        <AuthContext.Provider value={{ auth, setAuth , logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;