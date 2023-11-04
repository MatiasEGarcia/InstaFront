import { createContext, useEffect, useState } from "react";
import { useNotification } from "../hooks/useNotification";
import { getPersonalNotifications, logout as logoutFromService } from "../Service/UserService";
import { NOTIFICATION_MESSAGES, NOTIFICATION_SEVERITIES, NOTIFICATION_TYPE } from "../Util/UtilTexts";
import { RefreshTokenException } from "../Errors/Errors";
import SockJS from 'sockjs-client';
import { over } from 'stompjs';

const AuthContext = createContext();
var stompClient = null;

export function AuthProvider({ children }) {
    console.log('ENTRANDO EN AUTHPROVIDER')
    const [auth, setAuth] = useState({});
    const { setNotification, setNotificationList } = useNotification();
    const [socketConnected, setSocketConnected] = useState(false);

    function logout() {
        logoutFromService().then((data) => {
            setAuth({});
            console.log(data.body.message);
        }).catch((error) => {
            if (error instanceof RefreshTokenException) {
                //success because the tokens are not valid, which is what 
                //the user wanted from the beginning so it's the same
                setAuth({});
            } else {
                setNotification({
                    sev: NOTIFICATION_SEVERITIES[1], //Error
                    msg: error.message
                })
            }
        })
    }

    useEffect(() => {
        if (auth.user) {
            getPersonalNotifications().then((data) => {
                if (data.body?.list) {
                    setNotificationList(data.body.list);
                } else if (data.headers) {//in case that there are not notifi
                    setNotification({
                        sev: NOTIFICATION_SEVERITIES[2],
                        msg: data.headers.get('moreInfo'),
                        type: NOTIFICATION_TYPE[5]//serverMessage
                    })
                }
            }).catch((error) => {
                setNotification({
                    sev: NOTIFICATION_SEVERITIES[1],//error
                    msg: error.message,
                    type: NOTIFICATION_TYPE[5]//serverMessage
                })
            });
        }

        if (auth.user && !socketConnected) {//if socket is alreay connected then user was changed but I don't need to connect again to websocket
            //connect to web socket
            const sockJsProtocols = ['websocket']
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
            setNotification({
                sev: NOTIFICATION_SEVERITIES[1], // ERROR
                msg: error,
                type: NOTIFICATION_TYPE[5], //SERVERERROR
            });
        }

        function handleServerNotification(payload) {
            setNotification({
                sev: NOTIFICATION_SEVERITIES[2], //info
                msg: NOTIFICATION_MESSAGES.get(payload.type),
                fromWho: payload.fromWho,
                type: payload.type,
                createdAt: new Date(payload.createdAt)
            });
        }

    }, [auth]);





    return (
        <AuthContext.Provider value={{ auth, setAuth, logout, socketConnected }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;