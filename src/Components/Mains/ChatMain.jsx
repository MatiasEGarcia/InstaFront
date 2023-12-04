import { useEffect, useRef, useState } from "react"
import { InfoCircle } from "react-bootstrap-icons"
import { create, getAllByChat } from "../../Service/MessageService";
import { useNotification } from "../../hooks/useNotification";
import { BACK_HEADERS, DIR_DESC_DIRECTION, NOTIFICATION_SEVERITIES } from "../../Util/UtilTexts";
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
 * @param {String} param.chatId chat'id, will be used to get chat messages. 
 * @param {String} param.name chat's name.
 * @param {Array} param.users chat's users.
 * @param {Array} param.admins chat's admins.
 * @param {String} param.image chat's image.
 * @param {Function} param.delChatFromChatList function to delete chat from chat list.
 * @returns {JSX.Element} Chat messages
 */
export default function ChatMain({ chatId, name, image, users, admins, delChatFromChatList }) {
    const [messagesList, setMessagesList] = useState([]);
    const [pagDetails, setPagDetails] = useState(basePagDetail);
    const { setNotificationToast } = useNotification();
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

    function sendANewMessage(){
        create({chatId, 
            message: newMessageRef.current.value
        }).then((data) => {
            setMessagesList([data.body, ...messagesList])
        }).catch((error) => {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[1],
                msg: error.message
            });
        });
    }

    return (
        <main className="col-8 col-md-9">
            <div className="card w-100 vh-100">
                <div className="card-header d-flex justify-content-between ">
                    <div>
                        <UserImageProfile imgWidth="60px" imgHeight="60px" img={image}/>
                        <span className="ps-2 fs-5">{name}</span>
                    </div>
                    <button className="btn">
                        <InfoCircle className="align-self-center" size={35} />
                    </button>
                </div>
                <div className="card-body overflow-auto">
                    {messagesList &&
                        <div>
                            <p className="m-0">No messages yet</p>
                        </div>
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
        </main>
    )
}