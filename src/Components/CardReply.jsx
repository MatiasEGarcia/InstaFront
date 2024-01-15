import UserImageProfile from "../Components/UserImageProfile";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

/**
 * 
 * @param {Object} param.item object with info to display .
 * @param {Function} param.updateReplyById function to update a reply. 
 * @param {Function} param.deleteReplyById function to delete a reply.
 * @returns {JSX.Element} return card with reply infomtion(a comment).
 */
export default function CardReply({
    item,
    updateReplyById,
    deleteReplyById
}) {
    const { auth } = useAuth();
    const [reply , setReply] = useState(item.body)
    const [flagChangeComment, setFlagChangeComment] = useState(false);

    const utcLocalCreateAt = new Date(item.createdAt);
    const options = {
        month: "numeric",
        day: "numeric",
        year: "numeric"
    }
    const localCreatedAt = utcLocalCreateAt.toLocaleDateString(undefined, options);

    function handlerChangeButton() {
        setFlagChangeComment(!flagChangeComment);
    }

    function handleReplyChange(newReply){
        setReply(newReply)
    }

    return (
        <>
            <div className="mb-2 d-flex justify-content-end" style={{ height: '150px' }}>
                <div className="row w-80 m-0 h-100">
                    <div className="col-1 me-2">
                        <UserImageProfile imgWidth="40px" imgHeight="40px" />
                    </div>
                    <div className="col d-flex flex-column">
                        <div className="h-20 d-flex justify-content-between">
                            <p className="m-0 fs-5">{item.ownerUser.username}</p>
                            <small className="m-0">{localCreatedAt}</small>
                        </div>
                        <div className="h-60">
                            <textarea
                                className="form-control w-100 h-100"
                                disabled={!flagChangeComment}
                                value={reply}
                                onChange={evt => handleReplyChange(evt.target.value)}
                                style={{ resize: 'none', fontSize: '12px' }}
                                maxLength="100"
                            />
                        </div>
                        <div className="h-20 mt-1">
                            {/**Only the the owner can delete or change comment */}
                            {item.ownerUser.id === auth.user.id &&
                                <>
                                    <button className="btn btn-light btn-sm ms-1" onClick={() => deleteReplyById(item.id)}>
                                        Delete
                                    </button>
                                    {!flagChangeComment &&
                                        <button className="btn btn-light btn-sm ms-1" onClick={handlerChangeButton}>
                                            Change
                                        </button>
                                    }
                                    {flagChangeComment &&
                                        <>
                                            <button className="btn btn-light btn-sm ms-1" onClick={handlerChangeButton}>
                                                Cancel
                                            </button>
                                            <button
                                                className="btn btn-light btn-sm ms-1"
                                                onClick={() => updateReplyById({ replyId: item.id, body: reply })}>
                                                Save
                                            </button>
                                        </>
                                    }
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}