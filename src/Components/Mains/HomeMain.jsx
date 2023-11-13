import { useModal } from "../../hooks/useModal";
import Modal from "../Modal";
import PublicationModal from "../PublicationModal";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import UserImageProfile from "../UserImageProfile";

//cuando me comunique con el server esto lo borro
function JustReturnModelContentExample() {
    return {
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

    const { modalState,
        setModalState,
        contentModal,
        showModal } = useModal(JustReturnModelContentExample);
    const { auth } = useAuth();

    function print() {
        console.log('se ejecuto')
    }

    return (
        <main className="col-12 col-md-8 col-xl-10">
            <div className="row">
                <div className="col-12 col-lg-8 
                                d-flex flex-column align-items-center gap-5
                                mt-5">{/*PARA MOSTRAR EN HILO, SIMPLEMENTE CREO UN ARRAY Y CUANDO PIDA OTRA PAGINA AGREGO LAS NUEVAS PUBLICAICONES
                                A LOS VIEJOS Y MUESTRO AMBOS sin un loading porque no quedaria muy bien*/}
                    {/**<PublicationCard showModal={showModal} width="w-75 w-sm-75 w-xl-50" /> */}

                    ACA SE DEBERIAN MOSTRAR LAS PUBLICACIONES DE LOS USUARIOS A LOS QUE SIGUE
                </div>
                <aside className="d-none d-lg-block col-lg-4 mt-5">
                    <ul className="nav flex-column gap-3">
                        <Link to={`/userHome/${auth.user.userId}`} className="nav-item btn btn-light w-80 d-flex justify-content-between">
                            <div>
                                <UserImageProfile imgWith="60px"
                                    imgHeight="60px"
                                    img={auth.user.image} />
                                <span className="ps-3 fs-5">{auth.user.username}</span>
                            </div>
                        </Link>
                        <hr className="w-80" />
                        <li className="nav-item w-80 mb-2">
                            <p className="m-0 text-center">Suggestions for you</p>
                        </li>
                        <Link to="/userHome" className="nav-item btn btn-light w-80 d-flex justify-content-between">
                            <div>
                                <img height="60px" width="60px" className="rounded-circle"
                                    src="/defaultImg/profile.jpg"
                                    alt="userImage" />
                                <span className="ps-3 fs-5">Username</span>
                            </div>
                        </Link>
                        <Link to="/userHome" className="nav-item btn btn-light w-80 d-flex justify-content-between">
                            <div>
                                <img height="60px" width="60px" className="rounded-circle"
                                    src="/defaultImg/profile.jpg"
                                    alt="userImage" />
                                <span className="ps-3 fs-5">Username</span>
                            </div>
                        </Link>
                    </ul>
                </aside>
                <Modal modalState={modalState} setModalState={setModalState}>
                    <PublicationModal setModalState={setModalState} contentModal={contentModal} />
                </Modal>
            </div>
        </main>
    )
}

export default HomeMain;