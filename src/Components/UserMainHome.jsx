import Modal from "./Modal";
import { useModal } from "../hooks/useModal";
import PublicationModal from "./PublicationModal";
import { useEffect, useState } from "react";
import { getAllByAuthUser } from "../Service/PublicationService";
import { useNotification } from "../hooks/useNotification";
import { FOLLOWED_LABEL, FOLLOWED_STATUS, FOLLOWERS_LABEL, NOTIFICATION_SEVERITIES, PUBLICATIONS_LABEL, LOADING_OPTIONS } from "../Util/UtilTexts";
import { useNavigate, useParams } from "react-router-dom";
import UsersHomePublications from "./UserHomePublications";
import { getGeneralUserInfo } from "../Service/UserService";
import UserImageProfile from "./UserImageProfile";
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
    const { modalState,
        setModalState,
        contentModal,
        showModal } = useModal(JustReturnModelContentExample);
    const setNotification = useNotification();
    const navigate = useNavigate();
    const { userId } = useParams();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        setLoading(true);
        getGeneralUserInfo(userId).then((data) => {
            setUser(data.body);
        }).catch((error) => {
            setNotification({
                sev: NOTIFICATION_SEVERITIES[1],//ERROR
                msg: error.message
            });
            navigate("/home");
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <main className="col-12 col-md-8 col-xl-10">
                <Loading spaceToTake={LOADING_OPTIONS[1]} />
            </main>
        )
    }


    return (
        <main className="col-12 col-md-8 col-xl-10">
            <div className="row p-3">
                <div className="col-12 col-md-5 text-center text-md-end">
                    <UserImageProfile img={user.user?.image}
                        imgHeight="180px"
                        imgWith="180px" />
                </div>
                <div className="col-12 col-md-7">
                    <div className="mt-3 w-100 w-lg-80 d-flex">
                        <h3>{user.user?.username}</h3>
                        <div className="ms-3 d-flex  gap-2">
                            {user.social?.followStatus === FOLLOWED_STATUS[3] && <button className="btn btn-light">Follow</button>}
                            {user.social?.followStatus === FOLLOWED_STATUS[0] && <button className="btn btn-light">Unfollow</button>}
                            {user.social?.followStatus === FOLLOWED_STATUS[2] && <span className="btn btn-light">Follow request in proccess</span>}
                            {user.social?.followStatus === FOLLOWED_STATUS[1] && <span className="btn btn-light">Follow request was rejected</span>}
                            <button className="btn btn-light">Send a message</button>
                        </div>
                    </div>
                    <div className="mt-3 w-100 w-lg-80 d-flex justify-content-between">
                        <p>{user.social?.numberPublications} {PUBLICATIONS_LABEL}</p>
                        <p>{user.social?.numberFollowers} {FOLLOWERS_LABEL}</p>
                        <p>{user.social?.numberFollowed} {FOLLOWED_LABEL}</p>
                    </div>
                </div>
            </div>
            <UsersHomePublications showModal={showModal} userOwnerId={userId} />
            <Modal modalState={modalState} setModalState={setModalState}>
                <PublicationModal setModalState={setModalState} contentModal={contentModal} />
            </Modal>
        </main>
    )
}

export default UserMainHome;