import { useEffect, useRef, useState } from "react"
import { InfoCircle } from "react-bootstrap-icons"
import { create, getAllByChat } from "../../Service/MessageService";
import { useNotification } from "../../hooks/useNotification";
import { BACK_HEADERS, CHAT_TYPE, DIR_ASC_DIRECTION, DIR_DESC_DIRECTION, NOTIFICATION_SEVERITIES, PAG_TYPES } from "../../Util/UtilTexts";
import UserImageProfile from "../UserImageProfile";
import Pagination from "../Pagination";
import ChatMessage from "../ChatMessage";
import useWebSocket from "../../hooks/useWebSocket";
import Modal from "../Modal";
import ChatGroupModal from "../ChatGroupModal";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const basePagDetail = {
    pageNo: 0,
    pageSize: 20,
    totalPages: undefined,
    totalElements: undefined,
    sortField: 'sendedAt',
    sortDir: DIR_ASC_DIRECTION
}


/**
 * 
 * @param {String} param.chatId chat'id, will be used to get chat messages. 
 * @param {String} param.name chat's name.
 * @param {Array} param.users chat's users.
 * @param {Array} param.admins chat's admins.
 * @param {String} param.image chat's image.
 * @param {Function} param.delChatFromChatList function to delete chat from chat list.
 * @param {String} param.type chat's type
 * @param {String} param.otherUserId other user id in case chat.type === PRIVATE
 * @returns {JSX.Element} Chat messages
 */
export default function ChatMain({ chatId, name, image, users, admins, delChatFromChatList, type , otherUserId}) {
    const [groupInfoModal, setGroupInfoModal] = useState(false);
    const [messagesList, setMessagesList] = useState([]);
    const [pagDetails, setPagDetails] = useState(basePagDetail);
    const { setNotificationToast } = useNotification();
    const { newMessage } = useWebSocket();
    const newMessageRef = useRef();

    //aca quiero tener la funcion para borrar un chat si el usuario autenticado es admin. y ademas dentro quiero una funcion que elemine el chat 
    //del chat lists
    useEffect(() => {
        getAllByChat({ chatId, ...pagDetails }).then((data) => {
            if (data.body?.list) {
                setMessagesList(data.body.list);
                setPagDetails({
                    ...pagDetails,
                    ...data.body.pageInfoDto
                });
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
            });
        });
    }, []);

    //will listen the new message from web socket, and will add it to the message list.
    useEffect(() => {
        setMessagesList([...messagesList, newMessage])
    }, [newMessage]);


    function sendANewMessage() {
        create({
            chatId,
            message: newMessageRef.current.value
        }).then((data) => {
            setMessagesList([...messagesList, data.body]);
            newMessageRef.current.value = '';
        }).catch((error) => {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[1],
                msg: error.message
            });
        });
    }

    function changeMessagePage() {

    }

    function openGroupInfoModal() {
        setGroupInfoModal(true);
    }


    return (
        <main className="col-8 col-md-9">
            <div className="card w-100 vh-100">
                <div className="card-header d-flex justify-content-between ">
                    <div>
                        <UserImageProfile imgWidth="60px" imgHeight="60px" img={image} />
                        <span className="ps-2 fs-5">{name}</span>
                    </div>
                    <button className="btn">
                        {type === CHAT_TYPE[0] &&
                            <Link to={`/userHome/${otherUserId}`} className="btn">
                                <InfoCircle className="align-self-center" size={35} />
                            </Link>
                        }
                        {type === CHAT_TYPE[1] && <InfoCircle className="align-self-center" size={35} onClick={openGroupInfoModal} />}
                    </button>
                </div>
                <div id="messagesContent" className="card-body overflow-auto">
                    {!messagesList &&
                        <div>
                            <p className="m-0">No messages yet</p>
                        </div>
                    }
                    {messagesList &&
                        <Pagination
                            itemsList={messagesList}
                            pageType={PAG_TYPES[1]}
                            changePage={changeMessagePage}
                            divId={"messagesContent"}
                            ComponentToDisplayItem={(props) => <ChatMessage {...props} />}
                        />
                    }
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
                <ChatGroupModal />
            </Modal>
        </main>
    )
}