import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllByFollowedUsers, likePublication as likePublicationService, deleteLikeOnPublication } from "../../Service/PublicationService";
import { DIR_DESC_DIRECTION, LOADING_OPTIONS, NOTIFICATION_SEVERITIES, PAG_TYPES } from "../../Util/UtilTexts";
import useAuth from "../../hooks/useAuth";
import { useNotification } from "../../hooks/useNotification";
import Loading from "../Loading";
import Modal from "../Modal";
import Pagination from "../Pagination";
import PublicationCard from "../PublicationCard";
import PublicationModal from "../PublicationModal";
import UserImageProfile from "../UserImageProfile";
import { usePag } from "../../hooks/usePag";

const basePagDetails = {
    pageNo: 0,//first page is 0
    pageSize: 2,
    totalPages: undefined,
    totalElements: undefined,
    sortField: 'createdAt',
    sortDir: DIR_DESC_DIRECTION
}

/**
 * 
 * @returns {JSX.Element} - The rendered main part of the Home page
 */
function HomeMain() {
    const [loading, setLoading] = useState(true);
    const [publicationSelectedId, setPublicationSelectedId] = useState();
    const [modalState, setModalState] = useState(false);
    const {
        elements : listPublications,
        pagDetails,
        flagPagDetails,
        setFlagPagDetails,
        setElements : setListPublications,
        setPagDetails,
        changePage,
        updateElementById : updatePublicationById
    } = usePag({ ...basePagDetails, initialFlagPagDetails: true });
    const { auth } = useAuth();
    const { setNotificationToast } = useNotification();

    //use effect to get last publications from followed users
    useEffect(() => {
        if (flagPagDetails) {
            getAllByFollowedUsers({ ...pagDetails }).then(data => {
                const numberOfElementsAlreadyInList = listPublications.length;
                if (data.body?.list && data.body.pageInfoDto.totalElements >= numberOfElementsAlreadyInList) {
                    setListPublications([...listPublications, ...data.body.list]);
                    setPagDetails({
                        ...pagDetails,
                        ...data.body.pageInfoDto
                    });
                }
                setFlagPagDetails(false);
            }).catch(error => {
                setNotificationToast({
                    sev: NOTIFICATION_SEVERITIES[1],
                    msg: error.message
                });
            }).finally(() => {
                setLoading(false);
            });
        }
    }, [pagDetails]);

    /**
     * Function to open and pass to modal an id to search a publication
     * @param {String} id - publication's id 
     */
    function selectPublication(id) {
        setPublicationSelectedId(id);
        setModalState(true);
    }

    /**
     * Function to like a publication by id.
     * @param {String} id - publication's id. 
     */
    function likePublication(id){
        likePublicationService(id).then(data => {
            updatePublicationById(data.body);
        }).catch(error => {
            setNotificationToast({
                sev : NOTIFICATION_SEVERITIES[1],
                msg: error.message
                
            });
        });
    };

    /**
     * Function to remove like from a publication.
     * @param {String} id - publication's id.
     */
    function removeLike(id){
        deleteLikeOnPublication(id).then(data => {
            updatePublicationById(data.body);
        }).catch(error => {
            setNotificationToast({
                sev : NOTIFICATION_SEVERITIES[1],
                msg: error.message
            });
        })
    };


    return (
        <main className="col-12 col-md-8 col-xl-10">
            <div className="row">
                <div id="publicationsColumn" className="col-12 col-lg-8 d-flex w-100
                                mt-3 pb-5 vh-75 vh-md-95">
                    <div className="d-flex flex-column align-items-center gap-5 w-100 w-lg-80">
                        {loading ?
                            <Loading spaceToTake={LOADING_OPTIONS[1]} />
                            : <Pagination
                                itemsList={listPublications}
                                pagType={PAG_TYPES[0]}
                                pagDetails={pagDetails}
                                changePage={changePage}
                                ComponentToDisplayItem={(props) => <PublicationCard showModal={selectPublication}
                                    likePublication = {likePublication}
                                    removeLike = {removeLike}
                                    width="w-75 w-sm-75 w-xl-50" {...props} />}
                            />}
                    </div>
                    <aside className="d-none d-lg-block col-lg-4 mt-5">
                        <ul className="nav flex-column gap-3">
                            <Link to={`/userHome/${auth.user.id}`} className="nav-item btn btn-light w-80 d-flex justify-content-between">
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
                </div>
                <Modal modalState={modalState} setModalState={setModalState}>
                    <PublicationModal setModalState={setModalState} id={publicationSelectedId} />
                </Modal>
            </div>
        </main>
    )
}

export default HomeMain;