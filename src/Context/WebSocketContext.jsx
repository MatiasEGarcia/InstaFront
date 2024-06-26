import { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { getWebSocketToken } from "../Service/UserService";
import { useNotification } from "../hooks/useNotification";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { NOTIFICATION_SEVERITIES, NOTIFICATION_TYPE } from "../Util/UtilTexts";

const WebSocketContext = createContext();

let stompClient = null;
export function WebSocketProvider({ children }) {
    const [newMessage, setNewMessage] = useState({
        chatId: undefined,
        messageId: undefined,
        body: undefined,
        userOwner: undefined,
        sendedAt: undefined
    });
    const [socketConnected, setSocketConnected] = useState(false);
    const { auth } = useAuth();
    const { setNotificationToast, createNotification } = useNotification();

    /**
     * Web socket, get tokens and make connection.
     */
    useEffect(() => {
        //web socket connection only if user is authenticated and socketConnected is false
        if (auth.user && !socketConnected) {
            getWebSocketToken().then(() => {
                //we got web socket token so we making connection
                const sockJsProtocols = ['websocket'];
                let sock = new SockJS(`http://localhost:8080/ws/connect?authentication=${localStorage.getItem('webSocketToken')}`,
                    null,
                    { transports: sockJsProtocols });
                stompClient = over(sock);
                stompClient.connect({}, onConnected, onError);
            }).catch((error) => {
                setNotificationToast({
                    sev: NOTIFICATION_SEVERITIES[1],
                    msg: error.message
                });
            });
        };
        /**
         * Making connection and suscribe to topics
         */
        function onConnected() {
            //notification topic
            stompClient.subscribe(`/user/notifications/${auth.user.id}/private`, handleServerNotification);
            //chat topic
            stompClient.subscribe(`/chat/${auth.user.id}`, handleServerNewMessageNotification);
            setSocketConnected(true);
        }

        function onError(error) {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[1], // ERROR
                msg: error
            });
        }

        /**
         * If there is some new notification to the current user.
         * @param {*} payload 
         */
        function handleServerNotification(payload) {
            const payloadBodyString = payload.body;
            const payloadBody = JSON.parse(payloadBodyString);
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[2],
                msg: payloadBody.notiMessage
            });
            createNotification({
                id: payloadBody.id,
                notificationType: payloadBody.notificationType,
                elementId: payloadBody.elementId,
                notiMessage: payloadBody.notiMessage,
                fromWho: payloadBody.fromWho,
                toWho: payloadBody.toWho,
                createdAt: payloadBody.createdAt
            });
        }

        /**
         * If there is some new message to the current user by web socket.
         * @param {*} payload 
         */
        function handleServerNewMessageNotification(payload) {
            const payloadBodyString = payload.body;
            const payloadBody = JSON.parse(payloadBodyString);
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[2],
                msg: "Tienes un nuevo mensaje"
            })
            setNewMessage({
                chatId: payloadBody.chatInfo.id,
                messageId: payloadBody.messageInfo.id,
                body: payloadBody.messageInfo.body,
                userOwner: payloadBody.messageInfo.userOwner,
                sendedAt: payloadBody.messageInfo.sendedAt
            });
        }


        /**
         * will execute when the current user logout.
         */
        if (!auth.user && socketConnected) {
            if (stompClient) {
                console.log('desconectando sockets')
                stompClient.disconnect();
                setSocketConnected(false);
            }
        }
    }, [auth]);



    return (
        <WebSocketContext.Provider value={{ newMessage }}>
            {children}
        </WebSocketContext.Provider>
    )
}

export default WebSocketContext;