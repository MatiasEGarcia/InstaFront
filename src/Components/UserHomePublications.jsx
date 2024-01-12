import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllByAuthUser } from "../Service/PublicationService";
import { BACK_HEADERS, LOADING_OPTIONS, NOTIFICATION_SEVERITIES, PAG_TYPES } from "../Util/UtilTexts";
import { useNotification } from "../hooks/useNotification";
import Loading from "./Loading";
import Modal from "./Modal";
import Pagination from "./Pagination";
import PublicationCard from "./PublicationCard";
import PublicationModal from "./PublicationModal";

const basePagDetails = {
    pageNo: 0,//first page is 0
    pageSize: 5,
    totalPages: undefined,
    totalElements: undefined,
    sortField: undefined,
    sortDir: undefined
}

export default function UsersHomePublications() {
    const [publicationModalState, setPublicationModalState] = useState(false);//used by Modal component to know if should show the modal or not
    const [publicationSelectedId, setPublicationSelectedId] = useState();
    const [userPublications, setUserPublications] = useState([]);
    const [pagDetailsFlag, setPagDetailsFlag] = useState(true);
    const [pagDetails, setPagDetails] = useState(basePagDetails);
    const [loading, setLoading] = useState(true);
    const { setNotificationToast } = useNotification();
    const { publicationId,userId } = useParams();

    useEffect(() => {
        if (publicationId) {
            setPublicationSelectedId(publicationId);
            setPublicationModalState(true);
        }
    }, [publicationId])


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
        setPublicationSelectedId(id)
        setPublicationModalState(true);
    }


    /**
    * useEffect to load all the current user Publications at the beggining.
    */
    useEffect(() => {
        if (pagDetailsFlag) {
            setLoading(true);
            const numberOfElementsAlreadyInList = userPublications.length;
            getAllByAuthUser({ ...pagDetails, ownerId: userId }).then((data) => {
                if (data.body?.list && data.body.pageInfoDto.totalElements >= numberOfElementsAlreadyInList) {
                    setUserPublications([...userPublications, ...data.body.list]);
                    setPagDetails({
                        ...pagDetails,
                        ...data.body.pageInfoDto,
                    })
                } else if (data.headers) {
                    console.info(data.headers.get(BACK_HEADERS[0]));
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
        getAllByAuthUser({ ...basePagDetails, ownerId: userId }).then((data) => {
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
    }, [userId]);

 

    return (
        <div className="row p-3 border d-flex justify-content-center gap-5">
            <Pagination
                itemsList={userPublications}
                pagType={PAG_TYPES[0]}
                changePage={changePage}
                pagDetails={pagDetails}
                ComponentToDisplayItem={(props) => <PublicationCard showModal={showModal}
                    width="w-80 w-sm-75 w-xl-30" {...props} />}
            />
            <Modal modalState={publicationModalState} setModalState={setPublicationModalState}>
                    <PublicationModal setModalState={setPublicationModalState} id={publicationSelectedId} />
            </Modal>
        </div>
    )
}
