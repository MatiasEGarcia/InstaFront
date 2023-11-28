import UserImageProfile from "./UserImageProfile";
import { PlusCircle, DashCircle, Star } from "react-bootstrap-icons";

/**
 * 
 * @param {String} param.userId - user id.
 * @param {String} param.image - user image
 * @param {Object} param.size - object with image size.
 * @param {Function} param.addUserOnChat - function to add user on chat to create.
 * @param {Function} param.removerUserFromChat - function to remover user from chat to create.
 * @param {Boolean} param.onChat - check to see if this card shows a user to add to the chat or to remove. false if the user is not in chat yet, and true if is.
 * @param {Boolean} param.isAdmin - flag to check if this user is admin or not.
 * @param {Function} param.removerUserAsAdmin - function to remove user from admin list on chat to create.
 * @param {Function} param.addUserAsAdmin - function to add user on admin list on chat to create.
 * @returns {JSX.Element} - The rendered card component for chat creation.
 */
export default function NewChatCard({
    userId,
    image,
    username,
    size = { width: "60px", height: "60px" },
    addUserOnChat,
    removeUserFromChat,
    onChat,
    isAdmin,
    removeUserAsAdmin,
    addUserAsAdmin
}) {
    return (
        <div key={userId} className="border rounded p-1 px-2 w-80 d-flex justify-content-between align-items-center">
            <UserImageProfile imgWidth={size?.width}
                imgHeight={size?.height}
                img={image} />
            <div className="text-start ps-3 w-100 ">
                <p className="m-0 fs-5">{username}</p>
            </div>
            {!onChat &&
                <PlusCircle size={60} className="cursor-pointer-hover" color="green"
                    onClick={() => addUserOnChat({ userId, image, username })} />
            }
            {onChat &&
                <>
                <Star 
                    size={60} 
                    className="cursor-pointer-hover me-1" 
                    color={isAdmin === true ? 'orange' : 'grey'}
                    onClick={isAdmin === true ? 
                        () => removeUserAsAdmin(userId) :
                         () => addUserAsAdmin({ userId, image, username })}
                    />
                <DashCircle size={60} className="cursor-pointer-hover" color="green"
                    onClick={() => removeUserFromChat(userId)} />
                </>
            }
        </div>
    )
}