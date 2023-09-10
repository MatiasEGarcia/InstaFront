import PublicationCard from "./PublicationCard";
import { Heart, XCircle } from "react-bootstrap-icons";
import { useState } from "react";
import Modal from "./Modal";
import { useModal } from "../hooks/useModal";

//cuando me comunique con el server esto lo borro
function JustReturnModelContentExample(){
    return({
        username: "matias",
        date: 22 - 5 - 23,
        description: "Some quick example text to build on the card title and make up thebulk of the card's content. "
    })
}

/**
 * @returns {JSX.Element} - show every user main page.
 */
function UserMainHome() {
    const {modalState,
        setModalState,
        publicationModal,
        showModal} = useModal(JustReturnModelContentExample);

    return (
        <main className="col-12 col-md-8 col-xl-10">
            <div className="row p-3">
                <div className="col-12 col-md-5 text-center text-md-end">
                    <img height="180px" width="180px" className="rounded-circle"
                        src="/defaultImg/profile.jpg"
                        alt="userImage" />
                </div>
                <div className="col-12 col-md-7">
                    <div className="mt-3 w-100 w-lg-80 d-flex">
                        <h3>Username</h3>
                        <div className="ms-3 d-flex  gap-2">
                            <button className="btn btn-light">Follow</button>
                            <button className="btn btn-light">Send a message</button>
                        </div>
                    </div>
                    <div className="mt-3 w-100 w-lg-80 d-flex justify-content-between">
                        <p>100 publicaciones</p>
                        <p>50 seguidores</p>
                        <p>60 seguidos</p>
                    </div>
                </div>
            </div>
            <div className="row p-3 border d-flex justify-content-center gap-5">
                <PublicationCard showModal={showModal} width="w-80 w-sm-75 w-xl-30" />
                <PublicationCard showModal={showModal} width="w-80 w-sm-75 w-xl-30" />
                <PublicationCard showModal={showModal} width="w-80 w-sm-75 w-xl-30" />
                <PublicationCard showModal={showModal} width="w-80 w-sm-75 w-xl-30" />
                <PublicationCard showModal={showModal} width="w-80 w-sm-75 w-xl-30" />
                <PublicationCard showModal={showModal} width="w-80 w-sm-75 w-xl-30" />
                <PublicationCard showModal={showModal} width="w-80 w-sm-75 w-xl-30" />
                <PublicationCard showModal={showModal} width="w-80 w-sm-75 w-xl-30" />
                <PublicationCard showModal={showModal} width="w-80 w-sm-75 w-xl-30" />
            </div>
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
        </main>
    )
}

export default UserMainHome;




/**
 * TENGO QUE CREAR UN COMPONENTE QUE RETORNE ALGO COMO PUBLICATIONMODAL, y eso es lo que meto como childre
 * dentro dle componente MODAL
 */