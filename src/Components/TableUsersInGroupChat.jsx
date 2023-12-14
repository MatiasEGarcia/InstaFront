import useChat from "../hooks/useChat";
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
    const [usersUsernameToQuit, setUsersUsernameToQuit] = useState([]); //list of users' username to quit of chat
    const { chatSelected, updateChat } = useChat();
    const { setNotificationToast } = useNotification();
    const { auth } = useAuth();
    const refButtonQuitUsers = useRef();

    useEffect(() => {
        const authUser = chatSelected.users.find((user) => user.userId === auth.user.userId);
        authUser.admin ? setAuthUserIsAdmin(true) : setAuthUserIsAdmin(false);
    }, []);

    /**
    * Function to add user username to quit it from chat group.
    * @param {String} username - user's username 
    */
    function setUserUsernameToQuit(username) {
        if (usersUsernameToQuit.includes(username)) {
            const listWithoutUser = usersUsernameToQuit.filter(usernameQuit => usernameQuit !== username);
            setUsersUsernameToQuit(listWithoutUser);
        } else {
            setUsersUsernameToQuit(prev => [...prev, username]);
        }
    }

    /**
     * Function to quit users from chat.
     */
    function handleQuitUsers() {
        quitUsers({ chatId: chatSelected.chatId, usersToQuit: usersUsernameToQuit }).then((data) => {
            updateChat(data.body);
        }).catch((error) => {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[1],
                msg: error.message
            });
        }).finally(() => {
            setUsersUsernameToQuit([]);
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
        updateAdminStatus({chatId : chatSelected.chatId , userId}).then((data) => {
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
                            {usersUsernameToQuit.length != 0 &&
                                <ArrowDownCircle className="cursor-pointer-hover" size={30} onClick={goToQuitButton} />}
                        </th>
                    </tr>
                </thead>
                <tbody className="position-relative">
                    {chatSelected.users.map((user) => {
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
                                            className={`${authUserIsAdmin ? 'cursor-pointer-hover' : ''} me-1 mb-2`}
                                            color={user.admin ? 'orange' : 'grey'}
                                            onClick={() => setAdminStatus(user.userId)}
                                        />
                                    </div>
                                </td>
                                <td className="text-center">
                                    <Trash size={50}
                                        className={`${authUserIsAdmin ? 'cursor-pointer-hover' : ''}
                                                         ${usersUsernameToQuit.includes(user.username) ? '' : 'opacity-25'}`}
                                        color="red"
                                        onClick={() => setUserUsernameToQuit(user.username)} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
                <tfoot ref={refButtonQuitUsers}>
                    <tr>
                        <td></td>
                        {usersUsernameToQuit.length !== 0 &&
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