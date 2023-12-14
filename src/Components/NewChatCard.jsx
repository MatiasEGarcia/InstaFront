import UserImageProfile from "./UserImageProfile";
import { PlusCircle, DashCircle, Star } from "react-bootstrap-icons";

/**
 * 
 * @param {String} param.userId - user id.
 * @param {String} param.image - user image
 * @param {Object} param.size - object with image size.
 * @param {Boolean} param.onChat - check to see if this card shows a user to add to the chat or to remove. false if the user is not in chat yet, and true if is.
 * @param {Boolean} param.isAdmin - flag to check if this user is admin or not.
 * @param {Function} param.setUserInChat - function to add or quit user of list of users to add on the chat.
 * @param {Function} param.setAdminInChat - function to add or quit user of list of users admins to add on the chat.
 * @returns {JSX.Element} - The rendered card component for chat creation.
 */
export default function NewChatCard({
    userId,
    image,
    username,
    size = { width: "60px", height: "60px" },
    onChat,
    isAdmin,
    addUserInChat,
    quitUserFromChat,
    addAdminInChat,
    quitAdminFromChat
}) {
    return (
        <div className="border rounded p-1 px-2 w-80 d-flex justify-content-between align-items-center">
            <UserImageProfile imgWidth={size?.width}
                imgHeight={size?.height}
                img={image} />
            <div className="text-start ps-3 w-100 ">
                <p className="m-0 fs-5">{username}</p>
            </div>
            {!onChat &&
                <PlusCircle size={60} className="cursor-pointer-hover" color="green"
                    onClick={() => addUserInChat({ userId, image, username })} />
            }
            {onChat &&
                <>
                <Star 
                    size={60} 
                    className="cursor-pointer-hover me-1" 
                    color={isAdmin === true ? 'orange' : 'grey'}
                    onClick={isAdmin === true ? 
                        () => quitAdminFromChat(userId) :
                         () => addAdminInChat({ userId, image, username })}
                    />
                <DashCircle size={60} className="cursor-pointer-hover" color="green"
                    onClick={() => quitUserFromChat(userId)} />
                </>
            }
        </div>
    )
}