import { useEffect, useRef, useState } from "react";
import { XSquare, ArrowLeftSquare } from "react-bootstrap-icons";
import { CHAT_TYPE, NOTIFICATION_SEVERITIES, LIKE, BACK_HEADERS } from "../Util/UtilTexts";
import { searchUsersByOneCondition } from "../Service/UserService";
import { useNotification } from "../hooks/useNotification";
import NewChatCard from "./NewChatCard";
import useAuth from "../hooks/useAuth";
import { create } from "../Service/ChatService";


/**
 * modal to display when auth user wants to create a new chat.
 * @param {Function} param.closeModal function to close this modal.
 * @param {Function} param.addChatToChatList function to add the new chat created to the chat List.
 */
export default function NewChatModal({ closeModal, addChatToChatList }) {
    const [chatType, setChatType] = useState();
    const [usernameToSearch, setUsernameToSearch] = useState('');
    const [usersFound, setUsersFound] = useState([]);
    const [usersForChat, setUsersForChat] = useState([]);
    const [adminsForChat, setAdminsForChat] = useState([]);
    const { setNotificationToast } = useNotification();
    const { auth } = useAuth();
    const groupNameInputRef = useRef();


    /**
     * useEffect to search users by username.
     */
    useEffect(() => {
        if (usernameToSearch.length !== 0) {
            searchUsersByOneCondition({
                column: 'username',
                value: usernameToSearch,
                operation: LIKE
            }).then((data) => {
                if (data.body?.list) {
                    setUsersFound(data.body.list);
                } else if (data.headers) {
                    setNotificationToast({
                        sev: NOTIFICATION_SEVERITIES[2],
                        msg: data.headers.get(BACK_HEADERS[0]),
                    });
                }
            }).catch((error) => {
                setNotificationToast({
                    sev: NOTIFICATION_SEVERITIES[1],
                    msg: error.message,
                });
            });
        }
    }, [usernameToSearch]);

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
            name : groupNameInputRef?.current?.value,
            type : chatType,
            usersToAdd : usersForChatUsernames,
            usersToAddAsAdmins : adminsForChatUsernames
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

    /**
     * Function to trigger username search.
     * @param {String} username 
     */
    function onchangeSearchUser(username) {
        setUsernameToSearch(username);
    }

    /**
     * Function to add a user to chat wanted to create
     * @param {String} param.userId user id
     * @param {String} param.image user image
     * @param {String} param.username username
     */
    function addUserOnChat({ userId, image, username }) {
        //add user if is not already in chat and if is not the auth user
        if (!usersForChat.find((user) => user.userId === userId)
            && auth.user.userId !== userId) {
            setUsersForChat([...usersForChat, { userId, image, username }]);
        }
    }

    /**
     * Function to remove a user from chat wanted to create.
     * @param {String} userId user id. 
     */
    function removeUserFromChat(userId) {
        const newList = usersForChat.filter((user) => user.userId !== userId);
        setUsersForChat(newList);
    }

    /**
     * Function to convert an user to admin in chat.
     * @param {String} param.userId user id
     * @param {String} param.image user image
     * @param {String} param.username username
     */
    function addUserAsAdmin({ userId, image, username }) {
        //add user if is not already in chat as admin and if is not the auth user
        if (!adminsForChat.find((user) => user.userId === userId)
            && auth.user.userId !== userId) {
            setAdminsForChat([...adminsForChat, { userId, image, username }]);
        }
    }

    /**
     * Function to remove an user it's admin status.
     * @param {String} userId user id. 
     */
    function removeUserAsAdmin(userId) {
        const newList = adminsForChat.filter((user) => user.userId !== userId);
        setAdminsForChat(newList);
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
                        <div className="row h-100">
                            <div className="col border-end">
                                <h4 className="text-center mb-3">Users in chat</h4>
                                {usersForChat.length === 0 &&
                                    <div className="text-center">
                                        <p>Select a user to add it on the chat</p>
                                    </div>
                                }
                                {usersForChat.length !== 0 &&
                                    <div className="vstack gap-2 h-70 overflow-auto align-items-center">
                                        {usersForChat.map((user) => {
                                            let isAdmin;
                                            const adminUser =
                                                adminsForChat.find((admin) => admin.userId === user.userId);
                                            if (adminUser) {
                                                isAdmin = true;
                                            } else {
                                                isAdmin = false;
                                            }

                                            return (
                                                <NewChatCard
                                                    userId={user.userId}
                                                    username={user.username}
                                                    image={user.image}
                                                    removeUserFromChat={removeUserFromChat}
                                                    onChat={true}
                                                    isAdmin={isAdmin}
                                                    addUserAsAdmin={addUserAsAdmin}
                                                    removeUserAsAdmin={removeUserAsAdmin}
                                                />
                                            )
                                        })}
                                    </div>
                                }
                            </div>
                            <div className="col">
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Search user by username"
                                    onChange={(evt) => onchangeSearchUser(evt.target.value)}
                                />
                                {usersFound.length !== 0 &&
                                    <div className="vstack gap-2 h-70 overflow-auto align-items-center">
                                        {usersFound.map((user) => {
                                            return (
                                                <NewChatCard
                                                    userId={user.userId}
                                                    username={user.username}
                                                    image={user.image}
                                                    addUserOnChat={addUserOnChat}
                                                    onChat={false}
                                                />
                                            )
                                        })}
                                    </div>
                                }
                            </div>
                        </div>
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