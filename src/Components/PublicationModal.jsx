import { useRef, useState, useEffect } from "react";
import { LOADING_OPTIONS, DIR_DESC_DIRECTION, PAG_TYPES, NOTIFICATION_SEVERITIES, BACK_HEADERS  } from "../Util/UtilTexts";
import { useNotification } from "../hooks/useNotification";
import { getById } from "../Service/PublicationService";
import { getByPublcationId, save, deleteById, updateById} from "../Service/CommentService";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import UserImageProfile from "./UserImageProfile";
import Pagination from "./Pagination";
import CardComment from "./CardComment";


const commentBasePagDetails = {
    pageNo: 0,
    pageSize: 20,
    totalPages: undefined,
    totalElements: undefined,
    sortField: 'createdAt',
    sortDir: DIR_DESC_DIRECTION
}

/**
 * Component that have the content that will be display when we want to see the publication info in a modal.
 * 
 * @param {Function} setModalState - function to close currently modal. 
 * @param {Object} publication - object with publication info to be display in modal.  
 * @param {String} id - publication id, to search it.
 * @returns {JSX.Element} modal where show publication info with comments.
 */
export default function PublicationModal({ setModalState, id }) {
    const [publication, setPublication] = useState({});
    const [loading, setLoading] = useState(true);
    const [rootComments, setRootComments] = useState([]);
    const [commentsPagDetailsFlag, setCommentsPagDetiailsFlag] = useState(false);
    const [commentsPagDetails, setCommentsPagDetails] = useState(commentBasePagDetails);
    const { setNotificationToast } = useNotification();
    const refNewComment = useRef();

    /**
     * to search all the data from a publication and then show it on publication modal.
     * And set base pagination details for comments.
     */
    useEffect(() => {
        setLoading(true);
        getById({ id, ...commentBasePagDetails }).then(data => {
            setPublication(data.body); 
            if(data.body.rootComments.list){
                setRootComments(data.body.rootComments.list);
            }
            setCommentsPagDetiailsFlag(false)
            setCommentsPagDetails({
                ...commentsPagDetails,
                ...data.body.rootComments.pageInfoDto
            });
        }).catch(error => {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[1],
                msg: error.message
            })
            setModalState(false); //close modal.
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    /**
    * To get more comments
    */
    useEffect(() => {
        if (commentsPagDetailsFlag) {
            const numberOfElementsAlreadyInList = rootComments.length;
            getByPublcationId({ id, ...commentsPagDetails }).then(data => {
                if (data.body?.list && data.body.pageInfoDto.totalElements >= numberOfElementsAlreadyInList) {
                    setRootComments(prev => [...prev, ...data.body.list]);
                    setCommentsPagDetails({
                        ...commentsPagDetails,
                        ...data.body.pageInfoDto,
                    })
                    setCommentsPagDetails(false);
                } else if (data.headers) {
                    console.log(data.headers.get(BACK_HEADERS[0]));
                }
            }).catch(error => {
                setNotificationToast({
                    sev: NOTIFICATION_SEVERITIES[1],
                    msg: error.message
                });
            });
        }
    }, [commentsPagDetails]);

    /**
     * To change page in pagination.
     * @param {String} newPageNo - new page number 
     */
    function changePage(newPageNo) {
        setCommentsPagDetails({
            ...commentsPagDetails,
            pageNo: newPageNo
        });
        setCommentsPagDetiailsFlag(true);
    }

    /**
     * To save root comments.
     * 
     * @param {Stirng} param.body comment's content.
     * @param {String} param.publImgId publication's id.
     */
    function saveRootComment({ body, publImgId }) {
        save({
            body,
            publImgId
        }).then(data => {
            //adding new comemnt
           setRootComments(prev => [data.body , ...prev]);
        }).catch(error => {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[1],
                msg: error.message
            })
        });
    }

    /**
     * Update a comment by id.
     * @param {String} param.commentId comment's id.
     * @param {String} param.body comment new content.
     * @param {String} param.isRootComment  to know if comment is root or not, if is root true, if not false.
     */
    function updateRootCommentBodyById({id, body}){
        updateById({id,body}).then(data => {
            updateRootCommentOnArray(data.body);
        }).catch(error => {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[1],
                msg: error.message
            })
        });
    };

    /**
     * To delete a root comment from the publication's comments.
     * @param {String} commentId - comment's id.
     */
    function deleteRootCommentById(commentId){
        deleteById(commentId).then(data => {
            quitRootCommentFromArray(commentId);
        }).catch(error => {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[1],
                msg: error.message
            })
        })
    };

    /**
     * To add the updated comment on root comments array an quit the old version.
     * @param {Object} updatedComment - updated comment 
     */
    function updateRootCommentOnArray(updatedComment){
        const newRootComments = rootComments.map(comment => {
            if(comment.commentId === updatedComment.commentId){
                return updatedComment;
            }
            return comment;
        });
        setRootComments(newRootComments)
    };

    /**
     *  To quit a comment from root comments array;
     * @param {String} commentId - comment's id.
     */
    function quitRootCommentFromArray(commentId){
        const newRootComments = rootComments.filter(comment => comment.commentId !== commentId);
        setRootComments(newRootComments);
    }


    if (loading) {
        return (
            <div className="w-100 w-md-75 h-80">
                <div className="card h-100 mh-100">
                    <Loading spaceToTake={LOADING_OPTIONS[0]} />
                </div>
            </div>
        )
    }


    return (
        <div className="w-100 w-md-85 h-90">
            <div className="card h-100 mh-100">
                <div className="row h-100">
                    <div className="col-md-5 d-flex justify-content-center align-items-center mh-100 pe-0">
                        <img src={`data:image/jpeg;charset=utf-8;base64,${publication.image}`}
                            className="img-fluid rounded-start p-1"
                            alt="image" />
                    </div>
                    <div className="col-md-7 mh-100">
                        <div className="card-header h-15 position-relative">
                            <Link className="btn" to={`/userHome/${publication.userOwner.userId}`}>
                                <UserImageProfile imgHeight="60px" imgWidth="60px" img={publication.userOwner.image} />
                                <p className=" d-inline m-0 ps-2 fs-5 align-self-center">{publication.userOwner.username}</p>
                            </Link>
                        </div>
                        <div className="card-body h-70 mh-70  overflow-auto">
                            <Pagination
                                itemsList={rootComments}
                                pagType={PAG_TYPES[0]}
                                changePage={changePage}
                                pagDetails={commentsPagDetails}
                                ComponentToDisplayItem={props => <CardComment updateRootCommentBodyById = {updateRootCommentBodyById}
                                    deleteRootCommentById={deleteRootCommentById} {...props} />}
                            />
                        </div>
                        <div className="card-footer h-15 d-flex align-items-center">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Leave a comment ,only 100 characteres"
                                    maxLength="100"
                                    ref={refNewComment} />
                                <span
                                    className="input-group-text btn btn-light"
                                    onClick={() => saveRootComment({ body: refNewComment.current.value, publImgId: id })}>
                                    Comment
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}