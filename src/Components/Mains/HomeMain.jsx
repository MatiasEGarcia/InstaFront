import { useModal } from "../../hooks/useModal";
import Modal from "../Modal";
import PublicationModal from "../PublicationModal";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import UserImageProfile from "../UserImageProfile";
import { DIR_DESC_DIRECTION, LOADING_OPTIONS, NOTIFICATION_SEVERITIES, PAG_TYPES } from "../../Util/UtilTexts";
import { useEffect, useState } from "react";
import { getAllByFollowedUsers } from "../../Service/PublicationService";
import { useNotification } from "../../hooks/useNotification";
import Loading from "../Loading";
import Pagination from "../Pagination";
import PublicationCard from "../PublicationCard";
import { getById } from "../../Service/PublicationService";

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
    const [modalState, setModalState] = useState(false);
    const [publicationSelected, setPublicationSelected] = useState({});
    const [pagDetails, setPagDetails] = useState(basePagDetails);
    const [pagDetailsFlag, setPagDetailsFlag] = useState(true);//??, is for the useEffect that is listening pagDetails, because changes pagDetails content too, and with this I avoid a loop. I will only put on true when the client wants to change the page.
    const [listPublications, setListPublications] = useState([]);
    const { auth } = useAuth();
    const setNotificationToast = useNotification();

    //use effect to get last publications from followed users
    useEffect(() => {
        if (pagDetailsFlag) {
            getAllByFollowedUsers({ ...pagDetails }).then(data => {
                const numberOfElementsAlreadyInList = listPublications.length;
                if (data.body?.list && data.body.pageInfoDto.totalElements > numberOfElementsAlreadyInList) {
                    setListPublications([...listPublications, ...data.body.list]);
                    setPagDetails({
                        ...pagDetails,
                        ...data.body.pageInfoDto
                    });
                }
                setPagDetailsFlag(false);
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

    function changePage(newPageNo) {
        setPagDetails({
            ...pagDetails,
            pageNo: newPageNo
        })
        setPagDetailsFlag(true);
    }

    /**
     * Function to search all the data from a publication
     * @param {String} id  publication's id.
     */
    function selectPublication(id) {
        getById(id).then(data => {
            setPublicationSelected(data.body);
        }).catch(error => {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[1],
                msg: error.message
            })
        });
    }

    return (
        <main className="col-12 col-md-8 col-xl-10">
            <div className="row h-50">
                <div id="publicationsColumn" className="col-12 col-lg-8 
                                d-flex flex-column align-items-center gap-5
                                mt-5 ">
                    {loading ?
                        <Loading spaceToTake={LOADING_OPTIONS[1]} />
                        : <Pagination
                            itemsList={listPublications}
                            pagType={PAG_TYPES[1]}
                            pagDetails={pagDetails}
                            changePage={changePage}
                            divId={"publicationsColumn"}
                            ComponentToDisplayItem={(props) => <PublicationCard showModal={selectPublication}
                                width="w-75 w-sm-75 w-xl-50" {...props} />}
                        />}
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
                    <PublicationModal setModalState={setModalState} publication={publicationSelected} />
                </Modal>
            </div>
        </main>
    )
}

export default HomeMain;