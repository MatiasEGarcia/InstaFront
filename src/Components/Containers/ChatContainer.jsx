import { useEffect, useState } from "react";
import { PencilSquare, InfoCircle, House } from "react-bootstrap-icons";
import { Link } from 'react-router-dom';
import { getChats } from "../../Service/ChatService";
import { useNotification } from "../../hooks/useNotification";
import { BACK_HEADERS, CHAT_TYPE, NOTIFICATION_SEVERITIES, PAG_TYPES } from "../../Util/UtilTexts";
import ChatCard from "../ChatCard";
import Pagination from "../Pagination";
import ChatMain from "../Mains/ChatMain";
import useAuth from "../../hooks/useAuth";
import Modal from "../Modal";
import NewChatModal from "../NewChatModal";
import { getAllByChat } from "../../Service/MessageService";

const basePagDetail = {
    pageNo: 0,
    pageSize: 15,
    totalPages: undefined,
    totalElements: undefined,
    sortField: undefined,
    sortDir: undefined
}

/**
 * @returns {JSX.Element} Chat view with chats and it's messages
 */
function ChatContainer() {
    const [newChatModal, setNewChatModal] = useState(false);
    const [chatList, setChatList] = useState([]);
    const [chatPageDetails, setChatPageDetails] = useState(basePagDetail);
    const [chatPageDetailsFlag, setChatPageDetailsFlag] = useState(false);
    const [currentChat, setCurrentChat] = useState({ //here we save current chat information.
        chatId : null,
        chatName : null,
        chatUsers: null,
        chatAdmins: null,
        chatImage: null,
        chatType:null,
        otherUserId: null
    });
    const { setNotificationToast } = useNotification();
    const { auth } = useAuth();

    /**
     * UseEffect to execute in mount moment and search authUser's chats.
     */
    useEffect(() => {
        getChats({ ...chatPageDetails }).then((data) => {
            if (data.body?.list) {
                setChatList(data.body.list);//I'll use scroll pagination so I will add new list elemnents and old list elements. 
            } else if (data.headers) {
                setNotificationToast({
                    sev: NOTIFICATION_SEVERITIES[2],
                    msg: data.headers.get(BACK_HEADERS[0])
                })
            }
            setChatPageDetails({
                ...chatPageDetails,
                ...data.body?.pageInfoDto
            });
        }).catch((error) => {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[1],
                msg: error.message
            })
        });
    }, []);

    /**
     * UseEffect to search next AuthUser's chats and add them to the chatList with previous chats in paginations page.
     */
    useEffect(() => {
        if (chatPageDetailsFlag) {
            getChats({ ...chatPageDetails }).then((data) => {
                setChatList([...chatList, ...data.body.list]);//I'll use scroll pagination so I will add new list elemnents and old list elements. 
                setChatPageDetails({
                    ...chatPageDetails,
                    ...data.body.pageInfoDto
                });
                setChatPageDetailsFlag(false);
            }).catch((error) => {
                setNotificationToast({
                    sev: NOTIFICATION_SEVERITIES,
                    msg: error.message
                })
            });
        }
    }, [chatPageDetails]);


    /**
     * Function to change selected chat and get it's messages.
     * Also check if chat is private, if is private chat name and image will be the other username and image.
     * @param {String} chatId  chat's id
     */
    function selectChat(chatId) {
        const chat = chatList.find((chat) => chat.chatId === chatId);
        if (chat.type === CHAT_TYPE[0]) {
            const otherUser = chat.users.find((user) => user.userId !== auth.user.userId);
            setCurrentChat({
                chatId : chatId,
                chatName: otherUser.username,
                chatUsers: chat.users,
                chatAdmins: chat.admins,
                chatImage: otherUser.image,
                chatType: chat.type,     
                otherUserId : otherUser.userId
            });
        }else{
            setCurrentChat({
                chatId : chatId,
                chatName: chat.name,
                chatUsers: chat.users,
                chatAdmins: chat.admins,
                chatImage: chat.image,
                chatType: chat.type
            });
        }
        
        
    }

    /**
     * Function to open modal to create a new chat.
     */
    function openNewChatModal() {
        setNewChatModal(true);
    }

    /**
     * Function to close modal to create a new chat.
     */
    function closeNewChatModal() {
        setNewChatModal(false);
    }

    /**
    * Function to change current page in the chat pagination
    * @param {String} newPageNo new Page 
    */
    function changeChatPage(newPageNo) {
        setChatPageDetails({
            ...chatPageDetails,
            ['pageNo']: newPageNo
        })
        setChatPageDetailsFlag(true);
    }

    /**
     * This function has to be applied to each chat, to see if is private, if is, 
     * then chat name will be the other user's username,
     * and chat image will be the other user's image;
     * @param {Object} chat - chat item that is in chatList
     * @returns {Object} chat object .
     */
    function setChatContent(chat) {
        if (chat.type === CHAT_TYPE[0]) {
            const otherUser = chat.users.find((user) => user.userId !== auth.user.userId);
            const newChatPrivate = {
                ...chat,
                name: otherUser.username,
                image: otherUser.image
            }
            return newChatPrivate;
        }
        return chat;
    }

    /**
     * This function should be called when a new chat is created, 
     * this way we add the new chat in chat list whithout the need to do a new request to server.
     * @param {String} param.chatId  chat's id.
     * @param {String} param.name  chat's name.
     * @param {CHAT_TYPE} param.type chat's type.
     * @param {String} param.image  chat's image.
     * @param {Array} param.users  chat's users.
     * @param {Array} param.admins chat's admins.
     */
    function addChatToChatList({ chatId, name, type, image, users, admins }) {
        const chatCreated = { chatId, name, type, image, users, admins }
        setChatList([...chatList, chatCreated])
    }


    return (
        <div className="container-lg">
            <div className="row">
                <nav className="col-4 col-md-3 pt-2 border vh-100">
                    <Link to="/home" className="link-underline link-underline-opacity-0">
                        <button className="btn btn-light w-100 d-flex justify-content-center justify-content-md-between ">
                            <House size={40} />
                            <h2 className="ps-2 d-none d-lg-block">
                                FrontReact
                            </h2>
                        </button>
                    </Link>
                    <div className="p-2 d-flex justify-content-center justify-content-md-between">
                        <span className="fs-4 d-none d-md-block">{auth.user.username}</span>
                        <button className="btn" onClick={openNewChatModal}>
                            <PencilSquare size={40} />
                        </button>
                    </div>
                    <hr />
                    <div id="chatStack" className="vstack gap-2 h-75 overflow-auto">
                        <Pagination
                            itemsList={chatList}
                            pageType={PAG_TYPES[1]}
                            changePage={changeChatPage}
                            divId={"chatStack"}
                            mapItem={setChatContent}
                            ComponentToDisplayItem={(props) => <ChatCard selectChat={selectChat} {...props} />} />
                    </div>
                </nav>
                {!currentChat.chatUsers &&
                    <div className="col d-flex justify-content-center align-items-center">
                        <p className="m-0 fs-2 pb-5">Select a chat</p>
                    </div>}
                {currentChat.chatUsers && <ChatMain 
                                                chatId = {currentChat.chatId}
                                                name = {currentChat.chatName}
                                                image = {currentChat.chatImage}
                                                users = {currentChat.chatUsers}
                                                admins = {currentChat.chatAdmins}
                                                type = {currentChat.chatType}
                                                otherUserId = {currentChat.otherUserId}
                                                />
                }
            </div>
            <Modal modalState={newChatModal} setModalState={setNewChatModal}>
                <NewChatModal closeModal={closeNewChatModal} addChatToChatList={addChatToChatList} />
            </Modal>
        </div >
    )
}

export default ChatContainer;