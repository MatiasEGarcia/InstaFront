import { getById } from "../Service/PublicationService";
import UserImageProfile from "./UserImageProfile";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { LOADING_OPTIONS } from "../Util/UtilTexts";
import { Link } from "react-router-dom";


/**
 * Component that have the content that will be display when we want to see the publication info in a modal.
 * 
 * @param {Function} setModalState - function to close currently modal. 
 * @param {Object} publication - object with publication info to be display in modal.  
 * @param {String} id - publication id, to search it.
 */
function PublicationModal({ setModalState ,id}) {
    const [publication, setPublication] = useState({});
    const [loading, setLoading] = useState(true);

    //to search all the data from a publication and then show it on publication modal.
    useEffect(() => {
        setLoading(true);
        getById(id).then(data => {
            setPublication(data.body);
        }).catch(error => {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[1],
                msg: error.message
            })
            setModalState(false); //close modal.
        }).finally(() => {
            setLoading(false);
        });
    },[]);


    if(loading){
        return (
            <div className="w-100 w-md-75 h-80">
                <div className="card h-100 mh-100">
                    <Loading spaceToTake = {LOADING_OPTIONS[0]}/>
                </div>
            </div>
        )
    }


    return (
        <div className="w-100 w-md-75 h-80">
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
                            <p>Aca iria un comentario</p>
                            <p>Aca iria un comentario</p>
                            <p>Aca iria un comentario</p>
                            <p>Aca iria un comentario</p>
                            <p>Aca iria un comentario</p>
                            <p>Aca iria un comentario</p>
                            <p>Aca iria un comentario</p>
                            <p>Aca iria un comentario</p>
                            <p>Aca iria un comentario</p>
                            <p>Aca iria un comentario</p>
                        </div>
                        <div className="card-footer h-15 d-flex align-items-center">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Send a message"
                                    aria-label="Send a message"
                                    aria-describedby="basic-addon1" />
                                <span className="input-group-text" id="basic-addon1">Comment</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PublicationModal;