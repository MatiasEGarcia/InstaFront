import { useEffect, useRef, useState } from "react";
import { InfoCircle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { create, getAllByChatId, setMessagesWatchedByChatId } from "../../Service/MessageService";
import { BACK_HEADERS, CHAT_TYPE, DIR_DESC_DIRECTION, NOTIFICATION_SEVERITIES, PAG_TYPES } from "../../Util/UtilTexts";
import useChat from "../../hooks/UseChat";
import { useNotification } from "../../hooks/useNotification";
import useWebSocket from "../../hooks/useWebSocket";
import ChatGroupModal from "../ChatGroupModal";
import ChatMessage from "../ChatMessage";
import Modal from "../Modal";
import Pagination from "../Pagination";
import UserImageProfile from "../UserImageProfile";

const basePagDetail = {
    pageNo: 0,
    pageSize: 20,
    totalPages: undefined,
    totalElements: undefined,
    sortField: 'sendedAt',
    sortDir: DIR_DESC_DIRECTION
}


/**
 * 
 * Block where we see chat's messages
 * 
 * @returns {JSX.Element} Chat messages
 */
export default function ChatMain() {
    const [groupInfoModal, setGroupInfoModal] = useState(false);
    const [messagesList, setMessagesList] = useState([]);
    const [pagDetails, setPagDetails] = useState(basePagDetail);
    const [pagDetailsFlag, setPagDetailsFlag] = useState(false);
    const { setNotificationToast } = useNotification();
    const { chatSelected, updateChat,updChatUserWNewMessage } = useChat();
    const { newMessage } = useWebSocket();
    const newMessageRef = useRef();
    const messageBottomDivOverflow = useRef();
    const refMessagesContent = useRef();

    useEffect(() => {
        //set scroll at the bottom
        messageBottomDivOverflow.current?.scrollIntoView({ behavior: "smooth" });
    },[]);

    /**
     * search chat's last messages.
     */
    useEffect(() => {
        getAllByChatId({ id: chatSelected.id, ...basePagDetail }).then((data) => {
            if (data.body?.list) {
                const reverseList = data.body.list.reverse();
                setMessagesList(reverseList);
                setPagDetails({
                    ...pagDetails,
                    ...data.body.pageInfoDto
                });
            } else if (data.headers) {
                setNotificationToast({
                    sev: NOTIFICATION_SEVERITIES[2],
                    msg: data.headers.get(BACK_HEADERS[0])
                })
                setMessagesList([]);
            }
        }).catch((error) => {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[1],
                msg: error.message
            });
        });
    }, [chatSelected.id]);

    //use effect to set all messages from chat as watched by auth user.
    useEffect(() => {
        if (chatSelected.messagesNoWatched !== "0") {
            setMessagesWatchedByChatId(chatSelected.id).then((data) => {
                const newChat = {
                    ...chatSelected,
                    messagesNoWatched: "0"
                }
                updateChat(newChat);
            }).catch((error) => {
                setNotificationToast({
                    sev: NOTIFICATION_SEVERITIES[1],
                    msg: error.message
                })
            });
        }
    }, [chatSelected.id])


    /**
     * if there is some change in pageDetails, means that the user wants to get more messages.
     */
    useEffect(() => {
        if (pagDetailsFlag) {
            getAllByChatId({ id: chatSelected.id, ...pagDetails }).then((data) => {
                if (data.body?.list && data.body.pageInfoDto.totalElements >= messagesList.length) {
                    const reverseList = data.body.list.reverse();
                    setMessagesList((prevMessageList) => [...reverseList, ...prevMessageList]);
                    setPagDetails({
                        ...pagDetails,
                        ...data.body.pageInfoDto
                    });
                } else if (data.headers) {
                    console.info(data.headers.get(BACK_HEADERS[0]));
                }
            }).catch((error) => {
                setNotificationToast({
                    sev: NOTIFICATION_SEVERITIES[1],
                    msg: error.message
                });
            }).finally(() => {
                setPagDetailsFlag(false);
            });
        }
    }, [pagDetails]);

    /**
     * will listen the new message from web socket, and will add it to the message list 
     * if new message chat is the same than the chatSelected.
     */
    useEffect(() => {
        if(newMessage.chatId === chatSelected.id){
            setMessagesList([...messagesList, newMessage])
        }
    }, [newMessage]);

    /**
     * listen new messages and change scroll height.
     */
    useEffect(() => {
        if (pagDetails.pageNo === 0 || pagDetailsFlag) {
            messageBottomDivOverflow.current?.scrollIntoView({ behavior: "smooth" });
        } 
    }, [messagesList]);


    /**
     * Write a new message on chat.
     */
    function sendANewMessage() {
        const message = newMessageRef.current.value;

        create({
            chatId: chatSelected.id,
            message
        }).then((data) => {
            setMessagesList([...messagesList, data.body]);
            newMessageRef.current.value = '';
            //we update last message, so we can see it in chat list.
            updChatUserWNewMessage({
                ...chatSelected,
                lastMessage : message
            })
            //send the user view to the new bottom.
            messageBottomDivOverflow.current?.scrollIntoView({ behavior: "smooth" });
        }).catch((error) => {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[1],
                msg: error.message
            });
        });
    }

    /**
     * To change the page in pagination.
     * @param {String} newPageNo new page in pagination.
     */
    function changeMessagePage(newPageNo) {
        setPagDetails({
            ...pagDetails,
            pageNo: newPageNo
        });
        setPagDetailsFlag(true);
    }

    /**
     * Open chat group info.
     */
    function openGroupInfoModal() {
        setGroupInfoModal(true);
    }

    /**
     * Close chat group info.
     */
    function closeModal() {
        setGroupInfoModal(false);
    }

    return (
        <main className="col-8 col-md-9">
            <div className="card w-100 vh-100">
                <div className="card-header d-flex justify-content-between ">
                    <div>
                        <UserImageProfile imgWidth="60px" imgHeight="60px" img={chatSelected.image} />
                        <span className="ps-2 fs-5">{chatSelected.name}</span>
                    </div>
                    <button className="btn">
                        {chatSelected.type === CHAT_TYPE[0] &&
                            <Link to={`/userHome/${chatSelected.otherUserId}`} className="btn">
                                <InfoCircle className="align-self-center" size={35} />
                            </Link>
                        }
                        {chatSelected.type === CHAT_TYPE[1] && <InfoCircle className="align-self-center" size={35} onClick={openGroupInfoModal} />}
                    </button>
                </div>
                <div className="card-body overflow-auto" ref={refMessagesContent}>
                    {!messagesList &&
                        <div>
                            <p className="m-0">No messages yet</p>
                        </div>
                    }
                    {messagesList &&
                        <Pagination
                            itemsList={messagesList}
                            pagType={PAG_TYPES[1]}
                            pagDetails={pagDetails}
                            changePage={changeMessagePage}
                            observerRoot = {refMessagesContent.current}
                            ComponentToDisplayItem={(props) => <ChatMessage {...props} />}
                        />
                    }
                    <div ref={messageBottomDivOverflow} />
                </div>
                <div className="card-footer">
                    <div className="input-group input-group-lg mb-2">
                        <input type="text"
                            className="form-control"
                            placeholder="Send a message"
                            ref={newMessageRef} />
                        <button className="btn btn-success px-4" onClick={sendANewMessage}>
                            Send
                        </button>
                    </div>
                </div>
            </div>
            <Modal modalState={groupInfoModal} setModalState={setGroupInfoModal}>
                <ChatGroupModal closeModal={closeModal} />
            </Modal>
        </main>
    )
}