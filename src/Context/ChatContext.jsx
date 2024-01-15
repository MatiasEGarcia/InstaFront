import { createContext, useState, useEffect } from "react";
import { useNotification } from "../hooks/useNotification";
import { getChats } from "../Service/ChatService";
import { BACK_HEADERS, CHAT_TYPE, LOADING_OPTIONS, NOTIFICATION_SEVERITIES } from "../Util/UtilTexts";
import useAuth from "../hooks/useAuth";
import Loading from "../Components/Loading";
import useWebSocket from "../hooks/useWebSocket";

const basePagDetail = {
    pageNo: 0,
    pageSize: 15,
}

const ChatContext = createContext();

export function ChatProvider({ children }) {
    const [chatSelected, setChatSelected] = useState({});
    const [chatListPageDetails, setChatListPageDetails] = useState(basePagDetail);
    const [chatListPageDetailsFlag, setListChatPageDetailsFlag] = useState(false);
    const [chatList, setChatList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { setNotificationToast } = useNotification();
    const { auth } = useAuth();
    const {newMessage} = useWebSocket();

    /**
     * UseEffect to execute in mount moment and search authUser's chats.
     */
    useEffect(() => {
        setLoading(true);
        getChats({ ...chatListPageDetails }).then((data) => {
            if (data.body?.list) {
                setChatList(data.body.list);//I'll use scroll pagination so I will add new list elemnents and old list elements. 
            } else if (data.headers) {
                setNotificationToast({
                    sev: NOTIFICATION_SEVERITIES[2],
                    msg: data.headers.get(BACK_HEADERS[0])
                })
            }
            setChatListPageDetails({
                ...chatListPageDetails,
                ...data.body?.pageInfoDto
            });
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
    useEffect(()=> {
        if(newMessage.chatId !== chatSelected.id){
            const newChatList = chatList.map((chat) => {
                if(chat.id === newMessage.chatId){
                    const msgNoWatchedNumber = Number(chat.messagesNoWatched);
                    chat.messagesNoWatched = msgNoWatchedNumber + 1;
                }
                return chat;
            })
            setChatList(newChatList);
        }
    },[newMessage]);

    /**
     * To update chat last message when there is a new message from websocket.
     */
    useEffect(() => {
        const chat = chatList.find(chat => chat.id === newMessage.chatId);
        updChatUserWNewMessage({
            ...chat,
            lastMessage : newMessage.body,
        })
    },[newMessage])


    /**
     * UseEffect to search next AuthUser's chats and add them to the chatList with previous chats in paginations page.
     */
    useEffect(() => {
        if (chatListPageDetailsFlag) {
            getChats({ ...chatListPageDetails }).then((data) => {
                setChatList([...chatList, ...data.body.list]);//I'll use scroll pagination so I will add new list elemnents and old list elements. 
                setChatListPageDetails({
                    ...chatListPageDetails,
                    ...data.body.pageInfoDto
                });
                setListChatPageDetailsFlag(false);
            }).catch((error) => {
                setNotificationToast({
                    sev: NOTIFICATION_SEVERITIES,
                    msg: error.message
                })
            });
        }
    }, [chatListPageDetails]);

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
        const chat = chatList.find((chat) => chat.id === chatId);
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
    * Function to change current page in the chat pagination
    * @param {String} newPageNo new Page 
    */
    function changeChatPage(newPageNo) {
        chatListPageDetails({
            ...chatListPageDetails,
            ['pageNo']: newPageNo
        })
        setListChatPageDetailsFlag(true);
    }

    /**
     * Function to add new chat created in chatList.
     * @param {*} newChat 
     */
    function addChatToChatList(newChat) {
        setChatList([newChat,...chatList]);
    }

    /**
     * To update a chat content from chatList.
     * @param {Object} chatUpdated chat updated.
     */
    function updateChat(chatUpdated) {
        const newChatList = chatList.map((chat) => {
            if (chat.id === chatUpdated.id) {
                return chatUpdated;
            }
            return chat;
        });
        setChatList(newChatList);
        setChatSelected(chatUpdated);
    }

    /**
     * Function to update a chat when a user write a new message.
     * we add the new chatUpdated to the front of the array.
     */
    function updChatUserWNewMessage(chatUpdated){
        const chatListWhithoutChatUdpated = chatList.filter(chat => chat.id !== chatUpdated.id);
        setChatList([chatUpdated,...chatListWhithoutChatUdpated]);

    }

    if (loading) {
        return (
            <Loading spaceToTake={LOADING_OPTIONS[0]} />
        )
    }

    return (
        <ChatContext.Provider value={{
            chatSelected,
            selectChat,
            chatList,
            setChatContent,
            changeChatPage,
            addChatToChatList,
            updateChat,
            updChatUserWNewMessage
        }}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatContext;