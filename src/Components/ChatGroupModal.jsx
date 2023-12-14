import { Link } from "react-router-dom";
import UserImageProfile from "./UserImageProfile";
import { PencilSquare, Star, Trash, XSquare, PencilFill, ArrowLeft, CheckSquare ,ArrowLeftSquare} from "react-bootstrap-icons";
import useAuth from "../hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import { addUsers, setChatGroupImage, setChatGroupName } from "../Service/ChatService";
import useChat from "../hooks/useChat";
import { useNotification } from "../hooks/useNotification";
import { NOTIFICATION_SEVERITIES } from "../Util/UtilTexts";
import TableUsersInGroupChat from "./TableUsersInGroupChat";
import AddUsersOnGroupChat from "./AddUsersOnGroupChat";

/**
 * Modal to see chat type group info. like users, name, etc.
 * 
 * @param {Functino} param.closeModal function to close modal. 
 * @returns 
 */
export default function ChatGroupModal({ closeModal }) {
    const [displayImageEditIcon, setdisplayImageEditIcon] = useState('d-none');//to show or hide PencilSquare
    const [usersForChat, setUsersForChat] = useState([]); //for add users on the chat.
    const [adminsForChat, setAdminsForChat] = useState([]); //for add admins on the chat.
    const [addUsersMode, setAddUserMode] = useState(false);
    const [name, setName] = useState(true);
    const { auth } = useAuth();
    const { chatSelected, updateChat } = useChat();
    const { setNotificationToast } = useNotification();
    const fileInputRef = useRef();
    const nameInputRef = useRef();

    function editGroupName() {
        name ? setName(false) : setName(true);
    }

    function setImageEditIconBlock() {
        setdisplayImageEditIcon('d-block');
    }

    function setImageEditIconNone() {
        setdisplayImageEditIcon('d-none');
    }

    /**
     * click in image input.
     */
    function handleGroupImageButtonClick() {
        fileInputRef.current.click();
    }

    /**
     * Function to change group image.
     */
    function saveNewGroupImage(evt) {
        setChatGroupImage({ img: evt.target.files[0], chatId: chatSelected.chatId }).then((data) => {
            updateChat(data.body);
        }).catch((error) => {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[1],
                msg: error.message
            });
        });
    }

    /**
     * Function to edit group chat's name.
     */
    function saveNewGroupName() {
        const newName = nameInputRef?.current?.value;
        if (newName === chatSelected.name) {
            return;
        }
        setChatGroupName({ newName, chatId: chatSelected.chatId }).then(((data) => {
            updateChat(data.body);
        })).catch((error) => {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[1],
                msg: error.message
            });
        }).finally(() => {
            editGroupName();
        });
    }

    /**
     * Function to change from table user list mode to add user mode and vice versa.
     */
    function handleAddUserMode(){
        addUsersMode ? setAddUserMode(false) : setAddUserMode(true);
    }

    function saveNewUsers(){
        const usersToAdd = usersForChat.map((user) => {
            return user.username;
        });
        const usersToAddAsAdmins = adminsForChat.map((user) => {
            return user.username;
        });

        addUsers({
             chatId : chatSelected.chatId,
             usersToAdd,
             usersToAddAsAdmins
            }).then((data) =>{
            updateChat(data.body);
        }).catch((error) => {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES,
                msg: error.message
            });
        }).finally(() => {
            setUsersForChat([]);
            setAdminsForChat([]);
            handleAddUserMode();
        });
    }

    return (
        <div className="w-80 w-md-45 h-90 d-flex justify-content-center">
            <div className="card w-100">
                <div className="card-header position-relative d-flex justify-content-center align-items-center">
                    {addUsersMode && 
                    <ArrowLeftSquare size={30} className="cursor-pointer-hover m-1 position-absolute top-0 start-0"
                    onClick={handleAddUserMode} />
                    }
                    
                    {name ?
                        <h3 onClick={editGroupName} className="cursor-pointer-hover">{chatSelected.name}</h3>
                        :
                        <div className="d-flex justify-content-evenly aling-items-center">
                            <ArrowLeft size={25} onClick={editGroupName} className="cursor-pointer-hover mt-1" />
                            <input
                                type="text"
                                className="rounded w-50 ps-2 text-center"
                                id="chatNameInput"
                                name="chatNameInput"
                                placeholder={chatSelected.name}
                                ref={nameInputRef}
                            />
                            <CheckSquare size={25} onClick={saveNewGroupName} color="green" className="cursor-pointer-hover" />
                        </div>
                    }

                    <XSquare size={30} className="cursor-pointer-hover m-1 position-absolute top-0 end-0"
                        onClick={closeModal} />
                </div>
                <div className="card-body h-50 pt-1">
                    <div className="text-center">
                        <button className="position-relative btn"
                            type="button"
                            onMouseOver={setImageEditIconBlock}
                            onMouseLeave={setImageEditIconNone}
                            onClick={handleGroupImageButtonClick}>
                            <UserImageProfile
                                imgWith="120px"
                                imgHeight="120px"
                                img={chatSelected.image}
                                moreClasses="shadow-lg"
                            />
                            <span className={`${displayImageEditIcon} 
                                 position-absolute top-50 start-50 translate-middle 
                                 opacity-75`}>
                                <PencilSquare size={60} />
                            </span>
                        </button>
                        <input
                            type="file"
                            id="img"
                            name="img"
                            className="d-none"
                            ref={fileInputRef}
                            onChange={saveNewGroupImage} />
                    </div>
                    <div className="h-55 overflow-auto">
                        {!addUsersMode &&
                            <TableUsersInGroupChat/>
                        }

                        {addUsersMode && 
                            <AddUsersOnGroupChat
                                usersAlreadyInChat = {chatSelected.users}
                                usersForChat = {usersForChat}
                                adminsForChat = {adminsForChat}
                                setUsersForChat = {setUsersForChat}
                                setAdminsForChat = {setAdminsForChat}
                            />
                        }

                    </div>
                </div>
                <div className="card-footer h-md-10 text-center">
                    {addUsersMode ?
                    <button className="btn btn-success w-40" onClick={saveNewUsers}>
                        Save users
                    </button>
                    :
                    <button className="btn btn-success w-40" onClick={handleAddUserMode}>
                        Add more users
                    </button>
                    }
                </div>
            </div>
        </div>
    )
}