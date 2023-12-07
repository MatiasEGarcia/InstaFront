import { Link } from "react-router-dom";
import UserImageProfile from "./UserImageProfile";
import { Star, Trash, XSquare } from "react-bootstrap-icons";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";

/**
 * Modal to see chat type group info. like users, name, etc.
 * 
 * @param {Array} param.users chat's users.
 * @param {Array} param.usersAdmins chat's admin users. 
 * @returns 
 */
export default function ChatGroupModal({ chatName ,users, usersAdmins, closeModal }) {
    const { auth } = useAuth();
    const [authUserIsAdmin, setAuthUserIsAdmin] = useState();

    useEffect(() => {
        const authUser = usersAdmins.find((admin) => admin.userId === auth.user.userId);
        authUser ? setAuthUserIsAdmin(true) : setAuthUserIsAdmin(false);
    }, []);

    return (
        <div className="w-80 w-md-35 h-80 d-flex justify-content-center">
            <div className="card w-100">
                <div className="card-header text-center position-relative">
                    <h3>{chatName}</h3>
                    <XSquare size={30} className="cursor-pointer-hover m-1 position-absolute top-0 end-0"
                        onClick={closeModal} />
                </div>
                <div className="card-body overflow-auto">
                    <table className="w-100 table table-striped">
                        <tr>
                            <th></th>
                            <th><p className="m-0 text-center">Take out</p></th>
                        </tr>
                        {users.map((user) => {
                            const admin = usersAdmins.find((admin) => admin.userId === user.userId);
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
                    </table>
                </div>
            </div>
        </div>
    )
}