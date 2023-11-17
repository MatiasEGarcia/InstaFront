import { createContext, useEffect, useState } from "react";
import { RefreshTokenException } from "../Errors/Errors";
import { getPersonalNotifications, logout as logoutFromService } from "../Service/UserService";
import { NOTIFICATION_SEVERITIES } from "../Util/UtilTexts";
import { useNotification } from "../hooks/useNotification";
import { getWebSocketToken } from "../Service/UserService";
import SockJS from "sockjs-client";
import { over } from "stompjs";

const AuthContext = createContext();
let stompClient = null;
export function AuthProvider({ children }) {
    const [auth, setAuth] = useState({});
    const { setNotificationToast, setNotificationList, createNotification } = useNotification();
    const [socketConnected, setSocketConnected] = useState(false);
    const [tokensOk, setTokensOk] = useState(false);

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
                    setNotificationList(data.body.list);
                } else if (data.headers) {//in case that there are not notifi
                    setNotificationToast({
                        sev: NOTIFICATION_SEVERITIES[2],
                        msg: data.headers.get('moreInfo')
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

    /**
     * Web socket, get tokens and make connection.
     */
    useEffect(() => {
        //web socket connection only if user is authenticated and socketConnected is false
        if (auth.user && !socketConnected) {
            //getting web socket token
            getWebSocketToken().then(() => {
                console.log('obtuvimos los tokens')
                setTokensOk(true);
            }).catch((error) => {
                setNotificationToast({
                    sev: NOTIFICATION_SEVERITIES[1],
                    msg:error.message
                });
            });

        }

        if(tokensOk && auth.user){
            //making connection
            const sockJsProtocols = ['websocket'];
            let sock = new SockJS(`http://localhost:8080/ws/connect?authentication=${localStorage.getItem('webSocketToken')}`,
                null,
                { transports: sockJsProtocols });
            stompClient = over(sock);
            stompClient.connect({}, onConnected, onError);
        }

        function onConnected() {
            console.log('CONECTANDO CON WEB SOCKETTTTTTTTTTTTTTT')
            //it suscribe to it's listen chanel
            stompClient.subscribe(`/user/notifications/${auth.user.userId}/private`, handleServerNotification);
            setSocketConnected(true);
        }

        function onError(error) {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[1], // ERROR
                msg: error
            });
        }

        function handleServerNotification(payload) {
            console.log("LLEGOOOOOOOOOOOOOOOO " + payload);
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[2],
                msg: payload.notiMessage
            });
            createNotification({ ...payload });
        }

        if(!auth.user && socketConnected){
            if (stompClient) {
                console.log('desconectando sockets')
                stompClient.disconnect();
                setSocketConnected(false);
            }
        }
    },[auth,tokensOk]);



    return (
        <AuthContext.Provider value={{ auth, setAuth, logout, socketConnected, setSocketConnected }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;