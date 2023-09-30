import PublicationCard from "./PublicationCard";
import Modal from "./Modal";
import { useModal } from "../hooks/useModal";
import PublicationModal from "./PublicationModal";
import { useEffect, useState } from "react";
import { getAllByAuthUser } from "../Service/PublicationService";
import { useNotification } from "../hooks/useNotification";
import { LOADING_OPTIONS, NOTIFICATION_SEVERITIES } from "../Util/UtilTexts";
import Loading from "./Loading";

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
    const [userPublications, setUserPublications] = useState([]);
    const [loading, setLoading] = useState(false);
    const { modalState,
        setModalState,
        contentModal,
        showModal } = useModal(JustReturnModelContentExample);
    const setNotification = useNotification();

    useEffect(() => {
        setLoading(true);
        getAllByAuthUser({}).then((data) => {
            if (data.body.list) {
                setUserPublications(data.body.list);
            } else {
                console.log(data.headers['moreInfo']);
            }
        }).catch((error) => {
            setNotification({
                sev: NOTIFICATION_SEVERITIES[1],//ERROR
                msg: error.message
            });
        }).finally(() => {
            setLoading(false);
        });
    }, [])


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
                {loading
                    ? <Loading spaceToTake={LOADING_OPTIONS[1]} />
                    : userPublications.length === 0
                        ? <h2>There is not publications yet</h2>
                        : userPublications.map((publication) => {
                            return (
                                <PublicationCard key={publication.id}
                                    publication={publication}
                                    showModal={showModal}
                                    width="w-80 w-sm-75 w-xl-30" />
                            )
                        })}

            </div>
            <Modal modalState={modalState} setModalState={setModalState}>
                <PublicationModal setModalState={setModalState} contentModal={contentModal} />
            </Modal>
        </main>
    )
}

export default UserMainHome;