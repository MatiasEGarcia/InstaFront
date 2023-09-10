import { useModal } from "../hooks/useModal";
import { Heart, XCircle } from "react-bootstrap-icons";
import PublicationCard from "./PublicationCard";
import Modal from "./Modal";

//cuando me comunique con el server esto lo borro
function JustReturnModelContentExample(){
    return({
        username: "matias",
        date: 22 - 5 - 23,
        description: "Some quick example text to build on the card title and make up thebulk of the card's content. "
    })
}


/**
 * 
 * @returns {JSX.Element} - The rendered main part of the Home page
 */
function HomeMain() {

    const {modalState,
        setModalState,
        publicationModal,
        showModal} = useModal(JustReturnModelContentExample);

    return (
        <main className="col-12 col-md-8 col-xl-10">
            <div className="row">
                <div className="col-12 col-lg-8 
                                d-flex flex-column align-items-center gap-5
                                mt-5">
                    <PublicationCard showModal={showModal} width="w-75 w-sm-75 w-xl-50" />
                    <PublicationCard showModal={showModal} width="w-75 w-sm-75 w-lg-50" />
                    <PublicationCard showModal={showModal} width="w-75 w-sm-75 w-lg-50" />
                    <PublicationCard showModal={showModal} width="w-75 w-sm-75 w-lg-50" />
                    <PublicationCard showModal={showModal} width="w-75 w-sm-75 w-lg-50" />
                    <PublicationCard showModal={showModal} width="w-75 w-sm-75 w-lg-50" />
                    <PublicationCard showModal={showModal} width="w-75 w-sm-75 w-lg-50" />
                    <PublicationCard showModal={showModal} width="w-75 w-sm-75 w-lg-50" />
                    <PublicationCard showModal={showModal} width="w-75 w-sm-75 w-lg-50" />
                </div>
                <aside className="d-none d-lg-block col-lg-4 mt-5">
                    <ul className="nav flex-column gap-3">
                        <li className="nav-item">
                            <button className="btn btn-light w-100 d-flex justify-content-between">
                                <div>
                                    <img height="60px" width="60px" className="rounded-circle"
                                        src="/defaultImg/profile.jpg"
                                        alt="userImage" />
                                    <span className="ps-2 fs-5">Username</span>
                                </div>
                                <button className="btn btn-link">
                                    Follow
                                </button>
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-light w-100 d-flex justify-content-between">
                                <div>
                                    <img height="60px" width="60px" className="rounded-circle"
                                        src="/defaultImg/profile.jpg"
                                        alt="userImage" />
                                    <span className="ps-2 fs-5">Username</span>
                                </div>
                                <button className="btn btn-link">
                                    Follow
                                </button>
                            </button>
                        </li>
                    </ul>
                </aside>
                <Modal modalState={modalState} setModalState={setModalState}>
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
                                                <p className=" d-inline m-0 ps-2 fs-5 align-self-center">{publicationModal?.username}</p>
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
                                            <p className="pt-3">{publicationModal?.description}</p>
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
                </Modal>
            </div>
        </main>
    )
}

export default HomeMain;