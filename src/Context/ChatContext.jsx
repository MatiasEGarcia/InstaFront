import { createContext, useState, useEffect } from "react";
import { useNotification } from "../hooks/useNotification";
import { getChats } from "../Service/ChatService";
import { BACK_HEADERS, CHAT_TYPE, LOADING_OPTIONS, NOTIFICATION_SEVERITIES } from "../Util/UtilTexts";
import useAuth from "../hooks/useAuth";
import Loading from "../Components/Loading";
import useWebSocket from "../hooks/useWebSocket";
import { usePag } from "../hooks/usePag";

const basePagDetail = {
    pageNo: 0,
    pageSize: 15,
}

const ChatContext = createContext();

export function ChatProvider({ children }) {
    const [chatSelected, setChatSelected] = useState({});
    const [loading, setLoading] = useState(true);
    const { setNotificationToast } = useNotification();
    const { auth } = useAuth();
    const { newMessage } = useWebSocket();
    const { elements,
        setElements,
        pagDetails,
        setPagDetails,
        changePage,
        flagPagDetails,
        setFlagPagDetails,
        updateElementByIdAndAddItAtFront } = usePag({ ...basePagDetail });

    /**
     * UseEffect to execute in mount moment and search authUser's chats.
     */
    useEffect(() => {
        setLoading(true);
        getChats({ ...pagDetails }).then((data) => {
            if (data.body?.list) {
                setElements(data.body.list);//I'll use scroll pagination so I will add new list elemnents and old list elements.
                setPagDetails(prev => { return { ...prev, ...data.body.pageInfoDto } }); 
            } else if (data.headers) {
                setNotificationToast({
                    sev: NOTIFICATION_SEVERITIES[2],
                    msg: data.headers.get(BACK_HEADERS[0])
                })
            }
        }).catch((error) => {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[1],
                msg: error.message
            })
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    /**
     * Use effect to execute when there is some new Message and the chat owner is not 
     * the same than chatSelected
     */
    useEffect(() => {
        if (newMessage.chatId !== chatSelected.id) {
            const newChatList = elements.map((chat) => {
                if (chat.id === newMessage.chatId) {
                    const msgNoWatchedNumber = Number(chat.messagesNoWatched);
                    chat.messagesNoWatched = msgNoWatchedNumber + 1;
                }
                return chat;
            })
            setElements(newChatList);
        }
    }, [newMessage]);

    /**
     * To update chat last message when there is a new message from websocket.
     */
    useEffect(() => {
        if (newMessage.chatId) { 
            const chat = elements.find(chat => chat.id === newMessage.chatId);
            updateElementByIdAndAddItAtFront({ ...chat, lastMessage: newMessage.body });
        }
    }, [newMessage])


    /**
     * UseEffect to search next AuthUser's chats and add them to
     *  the chatList with previous chats in paginations page.
     */
    useEffect(() => {
        if (flagPagDetails) {
            getChats({ ...pagDetails }).then((data) => {
                setElements(prev => [...prev, ...data.body.list]);//I'll use scroll pagination so I will add new list elemnents and old list elements. 
                setPagDetails(prev => { return { ...prev, ...data.body.pageInfoDto } });
                setFlagPagDetails(false);
            }).catch((error) => {
                setNotificationToast({
                    sev: NOTIFICATION_SEVERITIES,
                    msg: error.message
                })
            });
        }
    }, [pagDetails]);

    /**
    * This function has to be applied to each chat in auth user's chatList, to see if is private, if is, 
    * then chat name will be the other user's username,
    * and chat image will be the other user's image;
    * @param {Object} chat - chat item that is in chatList
    * @returns {Object} chat object .
    */
    function setChatContent(chat) {
        if (chat.type === CHAT_TYPE[0]) {
            const otherUser = chat.users.find((user) => user.id !== auth.user.id);
            const newChatPrivate = {
                ...chat,
                name: otherUser.username,
                image: otherUser.image,
                otherUserId: otherUser.id
            }
            return newChatPrivate;
        }
        return chat;
    }

    /**
     * Function to change selected chat and get it's messages.
     * Also check if chat is private, if is private chat name and image will be the other username and image.
     * @param {String} chatId  chat's id
     */
    function selectChat(chatId) {
        const chat = elements.find((chat) => chat.id === chatId);
        if (chat.type === CHAT_TYPE[0]) {
            const otherUser = chat.users.find((user) => user.id !== auth.user.id);
            setChatSelected({
                ...chat,
                image: otherUser.image,
                name: otherUser.username,
                otherUserId: otherUser.id
            });
        } else {
            setChatSelected(chat);
        }
    }

    /**
     * Function to add new chat created in chatList.
     * @param {*} newChat 
     */
    function addChatToChatList(newChat) {
        setElements(prev => [newChat, ...prev]);
    }

    /**
     * To update a chat content from chatList.
     * @param {Object} chatUpdated chat updated.
     */
    function updateChat(chatUpdated) {
        const newChatList = elements.map((chat) => {
            if (chat.id === chatUpdated.id) {
                return chatUpdated;
            }
            return chat;
        });
        setElements(newChatList);
        setChatSelected(chatUpdated);
    }

    if (loading) {
        return (
            <Loading spaceToTake={LOADING_OPTIONS[0]} />
        )
    }

    return (
        <ChatContext.Provider value={{
            pagDetails,
            chatSelected,
            selectChat,
            chatList: elements,
            setChatContent,
            changeChatPage: changePage,
            addChatToChatList,
            updateChat,
            updChatUserWNewMessage: updateElementByIdAndAddItAtFront
        }}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatContext;