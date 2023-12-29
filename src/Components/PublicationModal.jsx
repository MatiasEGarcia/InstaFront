import { Heart, XCircle } from "react-bootstrap-icons";
/**
 * Component that have the content that will be display when we want to see the publication info in a modal.
 * 
 * @param {Function} setModalState - function to close currently modal. 
 * @param {Object} publication - object with publication info to be display in modal.  
 */
function PublicationModal({ setModalState , publication }) {

    return (
        <div className="w-100 w-md-75 h-80">
            <div className="card w-100 h-100">
                <div className="row g-0">
                    <div className="col-md-5">
                        <img src="..." className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-7">
                        <div className="card-header d-flex justify-content-between">
                            <div className="d-flex">
                                <button className="btn">
                                    <img height="60px" width="60px" className="rounded-circle"
                                        src="/defaultImg/profile.jpg"
                                        alt="userImage" />
                                    <p className=" d-inline m-0 ps-2 fs-5 align-self-center">{publication?.username}</p>
                                </button>
                                <button className="btn btn-link">
                                    Follow
                                </button>
                            </div>
                            <button className="btn" onClick={() => setModalState(false)}>
                                <XCircle className="align-self-center" size={35} />
                            </button>
                        </div>
                        <div className="card-body h-40 overflow-auto">
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
                            <p>Aca iria un comentario</p>
                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="pt-3">{publication?.description}</p>
                                <button className="btn fs-2">
                                    <Heart />
                                </button>
                            </div>
                            <div className="input-group mt-3">
                                <input type="text" className="form-control" />
                                <button className="btn btn-success w-25">
                                    <p className="fs-5 m-0">Post</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PublicationModal;