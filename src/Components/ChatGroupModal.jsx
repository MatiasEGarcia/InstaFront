import { Link } from "react-router-dom";
import UserImageProfile from "./UserImageProfile";
import { PencilSquare, Star, Trash, XSquare, PencilFill ,ArrowLeft, CheckSquare} from "react-bootstrap-icons";
import useAuth from "../hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import { setChatGroupImage } from "../Service/ChatService";
import useChat from "../hooks/UseChat";
import { useNotification } from "../hooks/useNotification";
import { NOTIFICATION_SEVERITIES } from "../Util/UtilTexts";

/**
 * Modal to see chat type group info. like users, name, etc.
 * 
 * @param {Functino} param.closeModal function to close modal. 
 * @returns 
 */
export default function ChatGroupModal({ closeModal }) {
    const [authUserIsAdmin, setAuthUserIsAdmin] = useState();
    const [displayImageEditIcon, setdisplayImageEditIcon] = useState('d-none');//to show or hide PencilSquare
    const [name, setName] = useState(true);
    const { auth } = useAuth();
    const {chatSelected, updateChat} = useChat();
    const {setNotificationToast} = useNotification();
    const fileInputRef = useRef();
    const nameInputRef = useRef();


    useEffect(() => {
        const authUser = chatSelected.admins.find((admin) => admin.userId === auth.user.userId);
        authUser ? setAuthUserIsAdmin(true) : setAuthUserIsAdmin(false);
    }, []);

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
        setChatGroupImage({img: evt.target.files[0] , chatId:chatSelected.chatId }).then((data) => {
            updateChat(data.body);
        }).catch((error) => {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[1],
                msg: error.message
            });
        });
    }

    /**
     * Function to edit group name
     */
    function saveNewGroupName() {
        //tengo que preguntar si es diferente al nombre viejo
        console.log('ENTRANDO EN EL saveNewGroupName')
    }


    return (
        <div className="w-80 w-md-35 h-80 d-flex justify-content-center">
            <div className="card w-100">
                <div className="card-header position-relative d-flex justify-content-center align-items-center">
                    {name ?
                        <h3 onClick={editGroupName} className="cursor-pointer-hover">{chatSelected.name}</h3>
                        :
                        <div className="d-flex justify-content-evenly aling-items-center">
                            <ArrowLeft size={25} onClick={editGroupName} className="cursor-pointer-hover mt-1"/>
                            <input
                                type="text"
                                className="rounded w-50 ps-2 text-center"
                                id="chatNameInput"
                                name="chatNameInput"
                                placeholder={chatSelected.name}
                                ref={nameInputRef}
                            />
                            <CheckSquare size={25} onClick={saveNewGroupName} color="green" className="cursor-pointer-hover"/>
                        </div>
                    }

                    <XSquare size={30} className="cursor-pointer-hover m-1 position-absolute top-0 end-0"
                        onClick={closeModal} />
                </div>
                <div className="card-body pt-1">
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
                    <div className="h-50 overflow-auto">
                        <table className="w-100 table table-striped">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th><p className="m-0 text-center">Take out</p></th>
                                </tr>
                            </thead>
                            <tbody>
                                {chatSelected.users.map((user) => {
                                    const admin = chatSelected.admins.find((admin) => admin.userId === user.userId);
                                    return (
                                        <tr key={user.userId}>
                                            <td className="border-end">
                                                <div className="w-70 d-flex justify-content-between align-items-center">
                                                    <Link to={`/userHome/${user.userId}`} className="btn m-0 p-0">
                                                        <UserImageProfile imgWith="60px"
                                                            imgHeight="60px"
                                                            img={user.image} />
                                                        <span className="ps-3 fs-5">{user.username}</span>
                                                    </Link>
                                                    <Star
                                                        size={30}
                                                        className="cursor-pointer-hover me-1 mb-2"
                                                        color={admin ? 'orange' : 'grey'}
                                                    />
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                {authUserIsAdmin ?
                                                    <Trash size={50} className="cursor-pointer-hover" color="red" />
                                                    : <Trash size={50} className="cursor-pointer-hover opacity-25" color="red" />}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}