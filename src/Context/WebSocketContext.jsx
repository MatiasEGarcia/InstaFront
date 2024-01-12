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
    const [tokensOk, setTokensOk] = useState(false);
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
                console.log('obtuvimos websocket tokens')
                setTokensOk(true);
            }).catch((error) => {
                setNotificationToast({
                    sev: NOTIFICATION_SEVERITIES[1],
                    msg: error.message
                });
            });
        };

        if (tokensOk && auth.user) {
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
            //notification topic
            stompClient.subscribe(`/user/notifications/${auth.user.userId}/private`, handleServerNotification);
            //chat topic
            stompClient.subscribe(`/chat/${auth.user.userId}`, handleServerNewMessageNotification);


            setSocketConnected(true);
        }

        function onError(error) {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[1], // ERROR
                msg: error
            });
        }

        function handleServerNotification(payload) {
            const payloadBodyString = payload.body;
            const payloadBody = JSON.parse(payloadBodyString);
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[2],
                msg: payloadBody.notiMessage
            });
            createNotification({
                notiId: payloadBody.notiId,
                notificationType: payloadBody.notificationType, 
                elementId : payloadBody.elementId,
                notiMessage: payloadBody.notiMessage,
                fromWho: payloadBody.fromWho,
                createdAt: payloadBody.createdAt
            });
        }

        function handleServerNewMessageNotification(payload) {
            const payloadBodyString = payload.body;
            const payloadBody = JSON.parse(payloadBodyString);
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[2],
                msg: "Tienes un nuevo mensaje"
            })

            setNewMessage({
                chatId: payloadBody.chatDto.chatId,
                messageId: payloadBody.messageDto.messageId,
                body: payloadBody.messageDto.body,
                userOwner: payloadBody.messageDto.userOwner,
                sendedAt: payloadBody.messageDto.sendedAt
            });
        }


        if (!auth.user && socketConnected) {
            if (stompClient) {
                console.log('desconectando sockets')
                stompClient.disconnect();
                setSocketConnected(false);
            }
        }
    }, [auth, tokensOk]);



    return (
        <WebSocketContext.Provider value={{newMessage}}>
            {children}
        </WebSocketContext.Provider>
    )
}

export default WebSocketContext;