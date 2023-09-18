import PublicationCard from "./PublicationCard";
import Modal from "./Modal";
import { useModal } from "../hooks/useModal";
import PublicationModal from "./PublicationModal";

//cuando me comunique con el server esto lo borro
function JustReturnModelContentExample() {
    return ({
        username: "matias",
        date: 22 - 5 - 23,
        description: "Some quick example text to build on the card title and make up thebulk of the card's content. "
    })
}

/**
 * Main component for user home page. where should be its publications,followers ,etc.
 * 
 * @returns {JSX.Element} - show every user main page.
 */
function UserMainHome() {
    const { modalState,
        setModalState,
        contentModal,
        showModal } = useModal(JustReturnModelContentExample);

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
                <PublicationModal setModalState={setModalState} contentModal={contentModal} />
            </Modal>
        </main>
    )
}

export default UserMainHome;