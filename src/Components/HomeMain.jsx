import { useModal } from "../hooks/useModal";
import PublicationCard from "./PublicationCard";
import Modal from "./Modal";
import PublicationModal from "./PublicationModal";
import { Link } from "react-router-dom";

//cuando me comunique con el server esto lo borro
function JustReturnModelContentExample(){
    return{
        username: "matias",
        date: 22 - 5 - 23,
        description: "Some quick example text to build on the card title and make up thebulk of the card's content. "
    }
}


/**
 * 
 * @returns {JSX.Element} - The rendered main part of the Home page
 */
function HomeMain() {

    const {modalState,
        setModalState,
        contentModal,
        showModal} = useModal(JustReturnModelContentExample);

        function print(){
            console.log('se ejecuto')
        }

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
                            <Link to="/userHome" className="btn btn-light w-80 d-flex justify-content-between">
                                <div>
                                    <img height="60px" width="60px" className="rounded-circle"
                                        src="/defaultImg/profile.jpg"
                                        alt="userImage" />
                                    <span className="ps-3 fs-5">Username</span>
                                </div>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/userHome" className="btn btn-light w-80 d-flex justify-content-between">
                                <div>
                                    <img height="60px" width="60px" className="rounded-circle"
                                        src="/defaultImg/profile.jpg"
                                        alt="userImage" />
                                    <span className="ps-3 fs-5">Username</span>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </aside>
                <Modal modalState={modalState} setModalState={setModalState}>
                    <PublicationModal setModalState={setModalState} contentModal={contentModal}/>
                </Modal>
            </div>
        </main>
    )
}

export default HomeMain;