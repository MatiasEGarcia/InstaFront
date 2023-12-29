import { useEffect, useRef, useState } from "react";
import { XSquare, ArrowLeftSquare } from "react-bootstrap-icons";
import { CHAT_TYPE, NOTIFICATION_SEVERITIES, LIKE, BACK_HEADERS } from "../Util/UtilTexts";
import { searchUsersByOneCondition } from "../Service/UserService";
import { useNotification } from "../hooks/useNotification";
import NewChatCard from "./NewChatCard";
import useAuth from "../hooks/useAuth";
import { create } from "../Service/ChatService";
import useChat from "../hooks/useChat";
import AddUsersOnGroupChat from "./AddUsersOnGroupChat";


/**
 * modal to display when auth user wants to create a new chat.
 * @param {Function} param.closeModal function to close this modal.
 */
export default function NewChatModal({ closeModal }) {
    const [chatType, setChatType] = useState();
    const [usersForChat, setUsersForChat] = useState([]);
    const [adminsForChat, setAdminsForChat] = useState([]);
    const { setNotificationToast } = useNotification();
    const { addChatToChatList } = useChat();
    const groupNameInputRef = useRef();


    /**
     * Function to create a chat.
     */
    function createChat() {
        const usersForChatUsernames = usersForChat.map((user) => {
            return user.username;
        });
        const adminsForChatUsernames = adminsForChat.map((user) => {
            return user.username;
        });
        create({
            name: groupNameInputRef?.current?.value,
            type: chatType,
            usersToAdd: usersForChatUsernames,
            usersToAddAsAdmins: adminsForChatUsernames
        })
            .then((data) => {
                console.log(data.body);
                setNotificationToast({
                    sev: NOTIFICATION_SEVERITIES[2],
                    msg: "chat created"
                });
                addChatToChatList(data.body);
                closeModal();
            })
            .catch((error) => {
                setNotificationToast({
                    sev: NOTIFICATION_SEVERITIES[1],
                    msg: error.message
                });
                closeModal();
            });
    }


    /**
     * Function to set the chatType for the new chat.
     * @param {CHAT_TYPE} newType new chat type.
     */
    function changeChatType(newType) {
        setChatType(newType);
    }

    /**
     * when the user select a chatType the user can't change the type unless it use this function to get back to selection block.
     */
    function backToChatTypeSelection() {
        setChatType();
        setUsersForChat([]);
    }



    return (
        <div className="card w-50 h-90">
            <div className="card-header h-10 text-center position-relative">
                {chatType &&
                    <ArrowLeftSquare size={30} className="cursor-pointer-hover m-1 position-absolute top-0 start-0"
                        onClick={backToChatTypeSelection} />
                }
                <h2 className="fw-semibold">Create a new chat</h2>
                <XSquare size={30} className="cursor-pointer-hover m-1 position-absolute top-0 end-0"
                    onClick={closeModal} />
            </div>
            <div className="card-body h-80">
                {!chatType &&
                    <div className="text-center d-flex justify-content-evenly">
                        {CHAT_TYPE.map((chatType) => {
                            return (
                                <button key={chatType} className="btn btn-light border border-black rounded"
                                    onClick={() => changeChatType(chatType)}>
                                    <p className="m-0 fs-4 text-capitalize">{chatType}</p>
                                </button>
                            )
                        })}
                    </div>
                }
                {chatType &&
                    <>
                        {chatType === CHAT_TYPE[1] &&
                            <div className="row mb-2">
                                <div className="col d-flex justify-content-center">
                                    <input
                                        type="text"
                                        className="w-50 form-control"
                                        placeholder="Group name"
                                        ref={groupNameInputRef} />
                                </div>
                            </div>
                        }
                        <AddUsersOnGroupChat
                            usersForChat={usersForChat}
                            adminsForChat={adminsForChat}
                            setUsersForChat={setUsersForChat}
                            setAdminsForChat={setAdminsForChat}
                        />
                    </>
                }
            </div>
            <div className="card-footer h-10 text-center">
                <button className="btn btn-success w-15" onClick={createChat}>
                    <p className="m-0 fs-5">Finish</p>
                </button>
            </div>
        </div>
    )
}