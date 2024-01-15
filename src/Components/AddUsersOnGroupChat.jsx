import { useState, useEffect } from "react";
import NewChatCard from "./NewChatCard";
import { searchUsersByOneCondition } from "../Service/UserService";
import { useNotification } from "../hooks/useNotification";
import { LIKE, NOTIFICATION_SEVERITIES, BACK_HEADERS } from "../Util/UtilTexts";
import useAuth from "../hooks/useAuth";


/**
 * Component to show space to search users and add to a list and add
 *  them to a new chat or a existing chat.
 * @param {Array} param.usersAlreadyInChat - users who are already in chat. if this value is null or undefined is because the chat is new.
 * @param {Array} param.usersForChat - users to add.
 * @param {Array} param.adminsForChat - users to add as admin in chat.(should be in usersForChat the users which are in this array).
 * @param {Function} param.setUsersForChat - to edit usersForChat state.
 * @param {Function} param.setAdminsForChat - to edit adminsForChat state.
 * @returns 
 */
export default function AddUsersOnGroupChat({
    usersAlreadyInChat,
    usersForChat,
    adminsForChat,
    setUsersForChat,
    setAdminsForChat
}) {
    const [usernameToSearch, setUsernameToSearch] = useState(''); // state to search user to add on chat in each change.
    const [usersFound, setUsersFound] = useState([]);
    const { setNotificationToast } = useNotification();
    const { auth } = useAuth();

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
     * Function to trigger username search.
     * @param {String} username 
     */
    function onchangeSearchUser(username) {
        setUsernameToSearch(username);
    }

    /**
     * @param {String} user.id - user's id.
     * @param {String} user.username - user's username. 
     * @param {String} user.image - user's image
     */
    function addUserInChat(user) {
        const flag = usersAlreadyInChat ? alreadyInChat(user.id) : null;
        const isInChat = usersForChat.find(userFromChat => userFromChat.id === user.id)
        if(!flag && !isInChat && auth.user.id !== user.id){
            setUsersForChat(prev => [...prev, user]);
        }
    }

    /** 
     * @param {String} id - user's id. 
     */
    function quitUserFromChat(id) {
        const whithoutUser = usersForChat.filter(userFromChat => userFromChat.id !== id);
        setUsersForChat(whithoutUser);
    }

    /**
     * 
     * @param {String} user.id - user's id.
     * @param {String} user.username - user's username. 
     * @param {String} user.image - user's image 
     */
    function addAdminInChat(user) {
        setAdminsForChat(prev => [...prev, user])
    }

    /**
     * @param {String} id - user's id. 
     */
    function quitAdminFromChat(id) {
        const whithoutUser = adminsForChat.filter(adminFromChat => adminFromChat.id !== id);
        setAdminsForChat(whithoutUser)
    }


    /**
     * Function to know if the user wanted to add on the chat is already in chat. if the chat is new these function is not necessary.
     * @param {String} id - user's id.
     * @returns true if user is already in chat, otherwise false.
     */
    function alreadyInChat(id) {
        const user = usersAlreadyInChat.find(user => user.id === id);
        if (user) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <div className="row h-100 w-100">
            <div className="col border-end">
                <h4 className="text-center mb-3">Users to add</h4>
                {usersForChat.length === 0 &&
                    <div className="text-center">
                        <p>Select a user to add on the chat</p>
                    </div>
                }
                {usersForChat.length !== 0 &&
                    <div className="vstack gap-2 h-70 overflow-auto align-items-center">
                        {usersForChat.map((user) => {
                            let isAdmin;
                            const adminUser =
                                adminsForChat.find((admin) => admin.id === user.id);
                            if (adminUser) {
                                isAdmin = true;
                            } else {
                                isAdmin = false;
                            }

                            return (
                                <NewChatCard key={user.id}
                                    id={user.id}
                                    username={user.username}
                                    image={user.image}
                                    onChat={true}
                                    isAdmin={isAdmin}
                                    quitUserFromChat = {quitUserFromChat}
                                    addAdminInChat = {addAdminInChat}
                                    quitAdminFromChat = {quitAdminFromChat}
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
                                <NewChatCard key={user.id}
                                    id={user.id}
                                    username={user.username}
                                    image={user.image}
                                    onChat={false}
                                    addUserInChat={addUserInChat}
                                />
                            )
                        })}
                    </div>
                }
            </div>
        </div>
    )
}