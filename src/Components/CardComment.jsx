import { useEffect, useRef, useState } from "react";
import { useNotification } from "../hooks/useNotification";
import { NOTIFICATION_SEVERITIES, DIR_ASC_DIRECTION, PAG_TYPES } from "../Util/UtilTexts";
import UserImageProfile from "../Components/UserImageProfile";
import { ChevronDoubleUp, ChevronDoubleDown } from "react-bootstrap-icons";
import WriteReply from "./WriteReply";
import CardReply from "./CardReply";
import useAuth from "../hooks/useAuth";
import { getByParentId, save, updateById, deleteById } from "../Service/CommentService";
import Pagination from "../Components/Pagination";
import { usePag } from "../hooks/usePag";


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
    const [numberOfReplies, setNumberOfReplies] = useState(item.associateCN);
    const [flagWriteReply, setFlagWriteReply] = useState(false);
    const [flagWriteAnotherReply, setFlagWriteAnotherReply] = useState(false);
    const [flagSeeReplies, setFlagSeeReplies] = useState(false);
    const {
        elements,
        setElements,
        pagDetails,
        setPagDetails,
        flagPagDetails,
        setFlagPagDetails,
        changePage,
        updateElementById,
        quitElementById
    } = usePag({...repliesBasePagDetails,initialFlagPagDetails : false});
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
        if (flagPagDetails) {
            const alreadyInList = elements.length;
            getByParentId({id:item.id , ...pagDetails }).then(data => {
                if (data.body?.list && data.body.pageInfoDto.totalElements > alreadyInList) {
                    setElements(prev => [...prev, ...data.body.list]);
                    setPagDetails(prev => {return {...prev, ...data.body.pageInfoDto}});
                    setFlagPagDetails(false);
                } else if (data.header) {
                    console.info(data.headers.get(BACK_HEADERS[0]));
                }
            }).catch(error => {
                setNotificationToast({
                    sev: NOTIFICATION_SEVERITIES[1],
                    msg: error.message
                })
            });
        }
    }, [flagPagDetails]);

    /**
     * TO save a reply.
     * @param {String} body comment's content.
     */
    function saveReply(body) {
        save({
            body,
            publImgId: item.associatedImg.id,
            parentId: item.id
        }).then(data => {
            //adding new reply
            setElements(prev => [...prev, data.body]);
            setNumberOfReplies(prev => prev + 1);
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
        updateById({ id: replyId, body }).then(data => {
            updateElementById(data.body);
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
            quitElementById(replyId);
        }).catch(error => {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[1],
                msg: error.message
            })
        })
    }

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
        setFlagPagDetails(true);
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
                            {item.associateCN === '0' && !flagWriteReply &&
                                <button className="btn btn-light btn-sm ms-1" onClick={handlerActiveReply}>
                                    Write a reply
                                </button>
                            }
                            {/**Only the the owner can delete or change comment */}
                            {item.ownerUser.id === auth.user.id &&
                                <>
                                    <button className="btn btn-light btn-sm ms-1" onClick={() => deleteRootCommentById(item.id)}>
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
                                                onClick={() => updateRootCommentBodyById({ id: item.id, body: comment })}>
                                                Save
                                            </button>
                                        </>
                                    }
                                </>
                            }
                            {!flagWriteReply && numberOfReplies !== 0 &&
                                <button className="btn btn-light btn-sm ms-3" onClick={handlerSeeReplies}>
                                    See replies
                                    <small className="mx-1">{numberOfReplies}</small>
                                    {flagSeeReplies ? <ChevronDoubleUp /> : <ChevronDoubleDown />}
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {flagWriteReply && <WriteReply saveReply={saveReply} cancel={handlerActiveReply} />}
            {flagSeeReplies && elements.length !== 0 &&
                <div className="overflow-auto" style={{maxHeight: '300px'}}>
                    <Pagination
                        itemsList={elements}
                        pagType={PAG_TYPES[0]}
                        changePage={changePage}
                        pagDetails={pagDetails}
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