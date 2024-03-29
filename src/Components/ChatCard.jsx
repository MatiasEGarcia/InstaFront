import UserImageProfile from "./UserImageProfile";
import { CHAT_TYPE } from "../Util/UtilTexts";
import useChat from "../hooks/UseChat";
import { useEffect, useState } from "react";

/**
 * 
 * 
 * @param {Object} param.sizeImage - object with image size.
 * @param {String} param.sizeImage.width - sizeImage width size.
 * @param {String} param.sizeImage.height - sizeImage height size.
 * @param {Object} param.item - chat's information.
 * @param {String} param.item.chatId - chat's id.
 * @param {String} param.item.name - chat's name.
 * @param {CHAT_TYPE} param.item.type - chat's type.
 * @param {String} param.item.image - chat's image.
 * @param {String} param.item.users - chat's users.
 * @param {String} param.item.admins - chat's admin users.
 * @returns {JSX.Element} card view for chats in chat container.
 */
export default function ChatCard({
    sizeImage = { width: "60px", height: "60px" },
    item
}) {
    const { selectChat } = useChat();
    const [messagesNoWatched, setMessagesNotWatched] = useState(0);

    //use effect to change messagesNoWatched to number.
    useEffect(() => {
        setMessagesNotWatched(+item.messagesNoWatched);
    }, []);

    return (
        <div className="pe-4">
            <button className="btn btn-light d-flex w-100" onClick={() => selectChat(item.id)}>
                <div className="position-relative">
                    <UserImageProfile
                        imgWidth={sizeImage.width}
                        imgHeight={sizeImage.height}
                        img={item.image}
                    />
                    {messagesNoWatched !== 0 && messagesNoWatched < 100 && <span className="d-lg-none badge 
                        bg-danger rounded-pill position-absolute top-0 start-100">{item.messagesNoWatched}</span>}
                    {messagesNoWatched !== 0 && messagesNoWatched > 100 && <span className="d-lg-none badge 
                        bg-danger rounded-pill position-absolute top-0 start-100">+100</span>}

                </div>
                <div className="d-none d-lg-block ps-1 w-100 text-start position-relative">
                    <div className="w-55 inline-block text-truncate">
                        <p className="mb-1">{item.name}</p>
                        <p className="m-0">
                            <small>
                                {item.lastMessage}
                            </small>
                        </p>
                    </div>
                    {messagesNoWatched !== 0 && messagesNoWatched < 100 && <span className="badge bg-danger rounded-pill 
                                                    position-absolute top-0 start-100">{item.messagesNoWatched}</span>}
                    {messagesNoWatched !== 0 && messagesNoWatched > 100 && <span className="badge bg-danger rounded-pill 
                                                    position-absolute top-0 start-100">+100</span>}
                </div>
            </button>
        </div>
    )
}