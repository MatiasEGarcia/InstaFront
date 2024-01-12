import { useEffect, useRef, useState } from "react";
import { useNotification } from "../hooks/useNotification";
import { NOTIFICATION_SEVERITIES, DIR_ASC_DIRECTION, PAG_TYPES } from "../Util/UtilTexts";
import UserImageProfile from "../Components/UserImageProfile";
import { ChevronDoubleUp, ChevronDoubleDown } from "react-bootstrap-icons";
import WriteReply from "./WriteReply";
import CardReply from "./CardReply";
import useAuth from "../hooks/useAuth";
import { getByParentId, save } from "../Service/CommentService";
import Pagination from "../Components/Pagination";


//Associated comment base pagination details.
const repliesBasePagDetails = {
    pageNo: 0,
    pageSize: 20,
    totalPages: undefined,
    totalElements: undefined,
    sortField: 'createdAt',
    sortDir: DIR_ASC_DIRECTION
}

/**
 * 
 * @param {Object} param.item - contains the info to show.
 * @param {Function} param.updateRootCommentBodyById - to udpate a comment.
 * @param {Function} param.deleteRootCommentById - to delete a comment. 
 * @returns {JSX.Element} card elements to display comments information and it's replies.
 */
export default function CardComment({
    item,
    updateRootCommentBodyById,
    deleteRootCommentById,
}) {
    const [comment, setComment] = useState(item.body);
    const [flagWriteReply, setFlagWriteReply] = useState(false);
    const [flagWriteAnotherReply, setFlagWriteAnotherReply] = useState(false);
    const [flagSeeReplies, setFlagSeeReplies] = useState(false);
    const [replies, setReplies] = useState([]);
    const [flagReplyPagDetails, setFlagReplyPagDetails] = useState(false);
    const [replyPagDetails, setReplyPagDetails] = useState(repliesBasePagDetails);
    const [flagChangeComment, setFlagChangeComment] = useState(false);
    const { auth } = useAuth();
    const { setNotificationToast } = useNotification();


    const utcLocalCreateAt = new Date(item.createdAt);
    const options = {
        month: "numeric",
        day: "numeric",
        year: "numeric"
    }
    const localCreatedAt = utcLocalCreateAt.toLocaleDateString(undefined, options);


    useEffect(() => {
        if (flagReplyPagDetails) {
            const alreadyInList = replies.length;
            getByParentId({ parentId: item.commentId, ...replyPagDetails }).then(data => {
                if (data.body?.list && data.body.pageInfoDto.totalElements > alreadyInList) {
                    setReplies(prev => [...prev, ...data.body.list]);
                    setReplyPagDetails({
                        ...replyPagDetails,
                        ...data.body.pageInfoDto
                    });
                    setFlagReplyPagDetails(false);
                } else if (data.header) {
                    console.log(data.headers.get(BACK_HEADERS[0]));
                }
            }).catch(error => {
                setNotificationToast({
                    sev: NOTIFICATION_SEVERITIES[1],
                    msg: error.message
                })
            });
        }
    }, [flagReplyPagDetails]);

    /**
     * To change page in pagination.
     * @param {String} newPageNo - new page number 
     */
    function changePage(newPageNo) {
        setReplyPagDetails({
            ...replyPagDetails,
            pageNo: newPageNo
        });
        setFlagReplyPagDetails(true);
    }

    /**
     * TO save a reply.
     * @param {String} body comment's content.
     */
    function saveReply(body) {
        save({
            body,
            publImgId: item.associatedImg.id,
            parentId: item.commentId
        }).then(data => {
            //adding new reply
            setReplies(prev => [...prev, data.body]);
        }).catch(error => {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[1],
                msg: error.message
            })
        });
    }

    /**
     * Update a reply by it's id.
     * @param {String} param.replyId reply's id.
     * @param {String} param.body reply's new content. 
     */
    function updateReplyById({ replyId, body }) {
        updateById({ commentId: replyId, body }).then(data => {
            updateReplyOnArray(data.body);
        }).catch(error => {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[1],
                msg: error.message
            })
        });
    }

    /**
     * To delete a reply comment from the publication's replies.
     * @param {String} replyId - reply's id.
     */
    function deleteReplyById(replyId) {
        deleteById(replyId).then(data => {
            console.info(data.body);
            quitReplyFromArrayById(replyId);
        }).catch(error => {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[1],
                msg: error.message
            })
        })
    }

    /**
     * To add the updated comment on replies array an quit the old version.
     * @param {Object} updatedReply - updated comment 
     */
    function updateReplyOnArray(updatedReply) {
        const newReplies = replies.map(reply => {
            if (reply.commentId === updatedReply.commentId) {
                return updatedReply;
            }
            return reply;
        });
        setReplies(newReplies)
    };

    /**
     *  To quit a reply from replies array;
     * @param {String} replyId - reply's id.
     */
    function quitReplyFromArrayById(replyId) {
        const newReplies = replies.filter(reply => reply.commentId !== replyId);
        setReplies(newReplies);
    };

    function handlerChangeButton() {
        setFlagChangeComment(!flagChangeComment);
    }

    function handlerActiveReply() {
        setFlagWriteReply(!flagWriteReply);
    }

    function handlerActiveAnotherReply() {
        setFlagWriteAnotherReply(!flagWriteAnotherReply);
    }

    function handlerSeeReplies() {
        setFlagSeeReplies(!flagSeeReplies);
        setFlagReplyPagDetails(true);
    }
    function handleChange(newComment) {
        setComment(newComment)
    }

    return (
        <>
            <div className="mb-3 h-40" >
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
                                value={comment}
                                onChange={evt => handleChange(evt.target.value)}
                                style={{ resize: 'none', fontSize: '12px' }}
                                maxLength="100"
                            />
                        </div>
                        <div className="h-20 mt-1">
                            {/**Only if the comment don't have replies yet */}
                            {item.associateCN === 0 && !flagWriteReply &&
                                <button className="btn btn-light btn-sm ms-1" onClick={handlerActiveReply}>
                                    Write a reply
                                </button>
                            }
                            {/**Only the the owner can delete or change comment */}
                            {item.ownerUser.userId === auth.user.userId &&
                                <>
                                    <button className="btn btn-light btn-sm ms-1" onClick={() => deleteRootCommentById(item.commentId)}>
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
                                                onClick={() => updateRootCommentBodyById({ commentId: item.commentId, body: comment })}>
                                                Save
                                            </button>
                                        </>
                                    }
                                </>
                            }
                            {!flagWriteReply && item.associateCN !== 0 &&
                                <button className="btn btn-light btn-sm ms-3" onClick={handlerSeeReplies}>
                                    See replies
                                    <small className="mx-1">{item.associateCN}</small>
                                    {flagSeeReplies ? <ChevronDoubleUp /> : <ChevronDoubleDown />}
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {flagWriteReply && <WriteReply saveReply={saveReply} cancel={handlerActiveReply} />}
            {flagSeeReplies && replies.length !== 0 &&
                <div className="overflow-auto" style={{maxHeight: '300px'}}>
                    <Pagination
                        itemsList={replies}
                        pagType={PAG_TYPES[0]}
                        changePage={changePage}
                        pagDetails={replyPagDetails}
                        ComponentToDisplayItem={props => <CardReply updateReplyById={updateReplyById}
                            deleteReplyById={deleteReplyById} {...props} />}
                    />
                    {!flagWriteAnotherReply &&
                        <div className="text-end mb-5">
                            <button className="btn btn-light btn-sm border border-2 w-35 me-5"  onClick={handlerActiveAnotherReply}>
                                Write a reply
                            </button>
                        </div>
                    }
                    {flagWriteAnotherReply && <WriteReply saveReply={saveReply} cancel={handlerActiveAnotherReply} />}
                </div>
            }
        </>
    )
}