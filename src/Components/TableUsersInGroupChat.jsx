import useChat from "../hooks/UseChat";
import { Link } from "react-router-dom";
import UserImageProfile from "./UserImageProfile";
import { Star, Trash, ArrowDownCircle } from "react-bootstrap-icons";
import { useEffect, useRef, useState } from "react";
import { quitUsers, updateAdminStatus } from "../Service/ChatService";
import { useNotification } from "../hooks/useNotification";
import useAuth from "../hooks/useAuth";
import { NOTIFICATION_SEVERITIES } from "../Util/UtilTexts";

export default function TableUsersInGroupChat() {
    const [authUserIsAdmin, setAuthUserIsAdmin] = useState();
    const [usersIdToQuit, setUsersIdToQuit] = useState([]); //list of users' username to quit of chat
    const { chatSelected, updateChat } = useChat();
    const { setNotificationToast } = useNotification();
    const { auth } = useAuth();
    const refButtonQuitUsers = useRef();

    useEffect(() => {
        const authUser = chatSelected.users.find((user) => user.id === auth.user.id);
        authUser.admin ? setAuthUserIsAdmin(true) : setAuthUserIsAdmin(false);
    }, []);

    /**
    * Function to add user'id to quit it from chat group.
    * @param {String} id - user's username 
    */
    function setUserToQuit(id) {
        if(!authUserIsAdmin){ //only admins can set users to quit
            return;
        }
        if (usersIdToQuit.includes(id)) {
            const listWithoutUser = usersIdToQuit.filter(usernameQuit => usernameQuit !== id);
            setUsersIdToQuit(listWithoutUser);
        } else {
            setUsersIdToQuit(prev => [...prev, id]);
        }
    }

    /**
     * Function to quit users from chat.
     */
    function handleQuitUsers() {
        if(!authUserIsAdmin){ //only admins can quit users.
            return;
        }
        quitUsers({ id: chatSelected.id, usersToQuit: usersIdToQuit }).then((data) => {
            updateChat(data.body);
        }).catch((error) => {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[1],
                msg: error.message
            });
        }).finally(() => {
            setUsersIdToQuit([]);
        });
    }

    function goToQuitButton() {
        refButtonQuitUsers.current?.scrollIntoView({ behavior: "smooth" });
    }

    /**
     * Function to update user's admin status.
     * @param {String} userId - user's id.
     */
    function setAdminStatus(userId){
        if(!authUserIsAdmin){ //only admins can change admins status
            return;
        }
        updateAdminStatus({chatId : chatSelected.id , userId}).then((data) => {
            updateChat(data.body);
        }).catch((error) => {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[1],
                msg : error.message
            });
        });
    }

    return (
        <>
            <table className="w-100 table table-striped">
                <thead>
                    <tr className="sticky-top">
                        <th></th>
                        <th className="d-flex justify-content-evenly align-items-center">
                            <p className="m-0 text-center">Take out</p>
                            {usersIdToQuit.length != 0 &&
                                <ArrowDownCircle className="cursor-pointer-hover" size={30} onClick={goToQuitButton} />}
                        </th>
                    </tr>
                </thead>
                <tbody className="position-relative">
                    {chatSelected.users.map((user) => {
                        return (
                            <tr key={user.id}>
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
                                            className={`${authUserIsAdmin ? 'cursor-pointer-hover' : ''} me-1 mb-2`}
                                            color={user.admin ? 'orange' : 'grey'}
                                            onClick={() => setAdminStatus(user.id)}
                                        />
                                    </div>
                                </td>
                                <td className="text-center">
                                    <Trash size={50}
                                        className={`${authUserIsAdmin ? 'cursor-pointer-hover' : ''}
                                                         ${usersIdToQuit.includes(user.id) ? '' : 'opacity-25'}`}
                                        color="red"
                                        onClick={() => setUserToQuit(user.id)} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
                <tfoot ref={refButtonQuitUsers}>
                    <tr>
                        <td></td>
                        {usersIdToQuit.length !== 0 &&
                            <td className="text-center">
                                <button className="mt-2 btn btn-danger" onClick={handleQuitUsers}>
                                    Quit users
                                </button>

                            </td>
                        }
                    </tr>
                </tfoot>
            </table>

        </>
    )
}