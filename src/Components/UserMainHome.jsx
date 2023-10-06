import PublicationCard from "./PublicationCard";
import Modal from "./Modal";
import { useModal } from "../hooks/useModal";
import PublicationModal from "./PublicationModal";
import { useEffect, useState } from "react";
import { getAllByAuthUser } from "../Service/PublicationService";
import { useNotification } from "../hooks/useNotification";
import { LOADING_OPTIONS, NOTIFICATION_SEVERITIES } from "../Util/UtilTexts";
import Loading from "./Loading";
import { useParams } from "react-router-dom";

const basePagDetails = {
    pageNo: 0,//first page is 0
    pageSize: 10,
    totalPages: undefined,
    totalElements: undefined,
    sortField: undefined,
    sortDir: undefined
}

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
    const [pagDetailsFlag, setPagDetailsFlag] = useState(false);//??, is for the useEffect that is listening pagDetails, becuase changes pagDetails content too, and with this I avoid a loop.
    const [pagDetails, setPagDetails] = useState(basePagDetails);
    const [loading, setLoading] = useState(false);
    const { modalState,
        setModalState,
        contentModal,
        showModal } = useModal(JustReturnModelContentExample);
    const setNotification = useNotification();
    const { userId } = useParams();

    /**
     * useEffect to load all the current user Publications at the beggining.
     */
    useEffect(() => {
        setLoading(true);
        getAllByAuthUser({ ...pagDetails, ownerId: userId }).then((data) => {
            if (data.body?.list) {
                setUserPublications(data.body.list);
                setPagDetails({
                    ...pagDetails,
                    ...data.body.pageInfoDto,
                })
            } else if (data.headers) {
                setNotification({
                    sev: NOTIFICATION_SEVERITIES[2],
                    msg: data.headers.get('moreInfo')
                });
            }
        }).catch((error) => {
            setNotification({
                sev: NOTIFICATION_SEVERITIES[1],//ERROR
                msg: error.message
            });
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    /**
     * 
     * @param {} param0 
     */
    function changePage(newPageNo) {
        setPagDetails({
            ...pagDetails,
            ['pageNo']: newPageNo
        });
        setPagDetailsFlag(true);
    }

    /**
     * useEffect to search user publications when there is a change in pagDetails content.
     */
    useEffect(() => {
        if (pagDetailsFlag) {
            setLoading(true);
            getAllByAuthUser({ ...pagDetails, ownerId: userId }).then((data) => {
                if (data.body?.list) {
                    setUserPublications(data.body.list);
                    setPagDetails({
                        ...pagDetails,
                        ...data.body.pageInfoDto,
                    })
                } else if (data.headers) {
                    setNotification({
                        sev: NOTIFICATION_SEVERITIES[2],//INFO
                        msg: data.headers.get('moreInfo')
                    });
                }
            }).catch((error) => {
                setNotification({
                    sev: NOTIFICATION_SEVERITIES[1],//ERROR
                    msg: error.message
                });
            }).finally(() => {
                setLoading(false);
                setPagDetailsFlag(false);
            });
        }
    }, [pagDetails]);

    /**
     * useEffect to change user when userId(from useParams) changes
     */
    useEffect(() => {
        setLoading(true);
        //I need to reset pagDetails so I use basePagDetails
        getAllByAuthUser({ ...basePagDetails, ownerId: userId }).then((data) => {
            if (data.body?.list) {
                setUserPublications(data.body.list);
                setPagDetails({
                    ...basePagDetails,
                    ...data.body.pageInfoDto,
                })
            } else if (data.headers) {
                setNotification({
                    sev: NOTIFICATION_SEVERITIES[2],//INFO
                    msg: data.headers.get('moreInfo')
                });
            }
        }).catch((error) => {
            setNotification({
                sev: NOTIFICATION_SEVERITIES[1],//ERROR
                msg: error.message
            });
        }).finally(() => {
            setLoading(false);
            setPagDetailsFlag(false);
        });
    }, [userId]);

    function returnLiPageElements() {
        const liPages = [];
        //I just want 5 prevPageOptions plus the current page, if not, just the possibles
        for (let i = 0, pageNoFor = pagDetails.pageNo; i < 5 && pageNoFor >= 0; i++, pageNoFor--) {
            liPages.unshift(
                <li className={`page-item ${pageNoFor === pagDetails.pageNo ? 'active disabled' : ''}`} key={pageNoFor}
                    onClick={() => changePage(pageNoFor)} >
                    <a className="page-link" href="#">
                        {pageNoFor + 1} {/*+ 1 because backend return first page as 0, but the user need to see 1 as first */}
                    </a>
                </li>
            );
        }

        //I just want 5 proxPageOptions without the current page ,that's why pageNo+1, the current page is showed in the prev for
        for (let i = 0, pageNoFor = pagDetails.pageNo + 1; i < 5 && pageNoFor < pagDetails.totalPages; i++, pageNoFor++) {
            liPages.push(
                <li className="page-item" key={pageNoFor} onClick={() => changePage(pageNoFor)} >
                    <a className="page-link" href="#">
                        {pageNoFor + 1}
                    </a>
                </li>
            );
        }
        return liPages;
    }

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
                        ? <h2 className="text-center">-</h2>
                        : userPublications.map((publication) => {
                            return (
                                <PublicationCard key={publication.id}
                                    publication={publication}
                                    showModal={showModal}
                                    width="w-80 w-sm-75 w-xl-30" />
                            )
                        })}

            </div>
            {pagDetails.totalPages && pagDetails.totalPages > 1 &&
                <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-center mt-2">
                        <li className={`${pagDetails.pageNo === 0 ? 'page-item disabled' : 'page-item'}`}>
                            <button className="page-link" aria-label="Previous" onClick={() => changePage(pagDetails.pageNo - 1)} >
                                <span aria-hidden="true">&laquo;</span>
                            </button>
                        </li>
                        {returnLiPageElements()}
                        <li className={`${pagDetails.pageNo === pagDetails.totalPages ? 'page-item disabled' : 'page-item'}`}>
                            <button className="page-link" aria-label="Next" onClick={() => changePage(pagDetails.pageNo + 1)} >
                                <span aria-hidden="true">&raquo;</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            }
            <Modal modalState={modalState} setModalState={setModalState}>
                <PublicationModal setModalState={setModalState} contentModal={contentModal} />
            </Modal>
        </main>
    )
}

export default UserMainHome;