import { useState, useEffect } from "react";
import Loading from "./Loading";
import Pagination from "./Pagination";
import { BACK_HEADERS, PAG_TYPES } from "../Util/UtilTexts";
import PublicationCard from "./PublicationCard";
import { useNotification } from "../hooks/useNotification";
import { NOTIFICATION_SEVERITIES, LOADING_OPTIONS } from "../Util/UtilTexts";
import { getAllByAuthUser } from "../Service/PublicationService";
import PublicationModal from "./PublicationModal";
import Modal from "./Modal";

//cuando me comunique con el server esto lo borro
const contentModalPublication = {
    username: "matias",
    date: 22 - 5 - 23,
    description: "Some quick example text to build on the card title and make up thebulk of the card's content. "
}

const basePagDetails = {
    pageNo: 0,//first page is 0
    pageSize: 2,
    totalPages: undefined,
    totalElements: undefined,
    sortField: undefined,
    sortDir: undefined
}

export default function UsersHomePublications({ userOwnerId }) {
    const [publicationModalState, setPublicationModalState] = useState(false);//used by Modal component to know if should show the modal or not
    const [userPublications, setUserPublications] = useState([]);
    const [pagDetailsFlag, setPagDetailsFlag] = useState(false);//??, is for the useEffect that is listening pagDetails, becuase changes pagDetails content too, and with this I avoid a loop.
    const [pagDetails, setPagDetails] = useState(basePagDetails);
    const [loading, setLoading] = useState(false);
    const { setNotificationToast } = useNotification();

    /**
     * Function to change current page in the pagination.
     * @param {String} newPageNo new page 
     */
    function changePage(newPageNo) {
        setPagDetails({
            ...pagDetails,
            ['pageNo']: newPageNo
        });
        setPagDetailsFlag(true);
    }

    /**
     * Function to show a modal with publication selected information.
     * @param {string} id - publication id.
     */
    function showModal(id) {
        setModalState(true);
    }


    /**
    * useEffect to load all the current user Publications at the beggining.
    */
    useEffect(() => {
        setLoading(true);
        getAllByAuthUser({ ...pagDetails, ownerId: userOwnerId }).then((data) => {
            if (data.body?.list) {
                setUserPublications(data.body.list);
                setPagDetails({
                    ...pagDetails,
                    ...data.body.pageInfoDto,
                })
            } else if (data.headers) {
                setNotificationToast({
                    sev: NOTIFICATION_SEVERITIES[2],
                    msg: data.headers.get(BACK_HEADERS[0])
                });
            }
        }).catch((error) => {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[1],
                msg: error.message
            });
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    /**
    * useEffect to search user publications when there is a change in pagDetails content.
    */
    useEffect(() => {
        if (pagDetailsFlag) {
            setLoading(true);
            getAllByAuthUser({ ...pagDetails, ownerId: userOwnerId }).then((data) => {
                if (data.body?.list) {
                    setUserPublications(data.body.list);
                    setPagDetails({
                        ...pagDetails,
                        ...data.body.pageInfoDto,
                    })
                } else if (data.headers) {
                    setNotificationToast({
                        sev: NOTIFICATION_SEVERITIES[2],
                        msg: data.headers.get(BACK_HEADERS[0])
                    });
                }
            }).catch((error) => {
                setNotificationToast({
                    sev: NOTIFICATION_SEVERITIES[1],
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
        getAllByAuthUser({ ...basePagDetails, ownerId: userOwnerId }).then((data) => {
            if (data.body?.list) {
                setUserPublications(data.body.list);
                setPagDetails({
                    ...basePagDetails,
                    ...data.body.pageInfoDto,
                })
            } else if (data.headers) {
                setNotificationToast({
                    sev: NOTIFICATION_SEVERITIES[2],
                    msg: data.headers.get(BACK_HEADERS[0])
                });
            }
        }).catch((error) => {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[1],
                msg: error.message
            });
        }).finally(() => {
            setLoading(false);
            setPagDetailsFlag(false);
        });
    }, [userOwnerId]);

    return (
        <div className="row p-3 border d-flex justify-content-center gap-5">
            {loading
                ? <Loading spaceToTake={LOADING_OPTIONS[1]} />
                : <Pagination
                    itemsList={userPublications}
                    pagType={PAG_TYPES[0]} //nav pagination
                    changePage={changePage}
                    pagDetails={pagDetails}
                    ComponentToDisplayItem={(props) => <PublicationCard showModal={showModal}
                        width="w-80 w-sm-75 w-xl-30" {...props} />}
                />
            }
            <Modal modalState={publicationModalState} setModalState={setPublicationModalState}>
                <PublicationModal setModalState={setPublicationModalState} contentModal={contentModalPublication} />
            </Modal>
        </div>
    )
}
