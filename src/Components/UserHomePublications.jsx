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
import { PublicationModalProvider } from "../Context/PublicationModalContext";
import { useParams } from "react-router-dom";

//cuando me comunique con el server esto lo borro
const contentModalPublication = {
    username: "matias",
    date: 22 - 5 - 23,
    description: "Some quick example text to build on the card title and make up thebulk of the card's content. "
}

const basePagDetails = {
    pageNo: 0,//first page is 0
    pageSize: 5,
    totalPages: undefined,
    totalElements: undefined,
    sortField: undefined,
    sortDir: undefined
}

export default function UsersHomePublications({ userOwnerId }) {
    const [publicationModalState, setPublicationModalState] = useState(false);//used by Modal component to know if should show the modal or not
    const [publicationSelectedId, setPublicationSelectedId] = useState();
    const [userPublications, setUserPublications] = useState([]);
    const [pagDetailsFlag, setPagDetailsFlag] = useState(true);
    const [pagDetails, setPagDetails] = useState(basePagDetails);
    const [loading, setLoading] = useState(false);
    const { setNotificationToast } = useNotification();
    const {publicationId} = useParams();

    useEffect(() => {
        if(publicationId){
            setPublicationSelectedId(publicationId);
            setPublicationModalState(true);
        }
    },[userOwnerId])


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
            getAllByAuthUser({ ...pagDetails, ownerId: userOwnerId }).then((data) => {
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
            <Pagination
                itemsList={userPublications}
                pagType={PAG_TYPES[0]}
                changePage={changePage}
                pagDetails={pagDetails}
                ComponentToDisplayItem={(props) => <PublicationCard showModal={showModal}
                    width="w-80 w-sm-75 w-xl-30" {...props} />}
            />
            <Modal modalState={publicationModalState} setModalState={setPublicationModalState}>
                <PublicationModalProvider>
                    <PublicationModal setModalState={setPublicationModalState} id={publicationSelectedId} />
                </PublicationModalProvider>
            </Modal>
        </div>
    )
}
