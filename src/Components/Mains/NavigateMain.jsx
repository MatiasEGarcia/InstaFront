import { useEffect, useState } from "react"
import { DIR_DESC_DIRECTION, LOADING_OPTIONS, NOTIFICATION_SEVERITIES, PAG_TYPES } from "../../Util/UtilTexts"
import Modal from "../Modal";
import { getAllByOwnerVisible } from "../../Service/PublicationService";
import { useNotification } from "../../hooks/useNotification";
import Pagination from "../Pagination";
import NavigateCard from "../NavigateCard";
import Loading from "../Loading";
import PublicationModal from "../PublicationModal";
import { usePag } from "../../hooks/usePag";

const basePagDetail = {
    pageNo: 0,
    pageSize: 9,
    totalPages: undefined,
    totalElements: undefined,
    sortField: 'createdAt',
    sortDir: DIR_DESC_DIRECTION
}

export default function NavigateMain() {
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [publicationSelectedId, setPublicationSelectedId] = useState();
    const {
        elements : listPublications,
        setElements : setListPublications,
        pagDetails,
        setPagDetails,
        flagPagDetails,
        setFlagPagDetails,
        changePage
    } = usePag({...basePagDetail, initialFlagPagDetails : true});
    const { setNotificationToast } = useNotification();
    
    useEffect(() => {
        if (flagPagDetails) {
            getAllByOwnerVisible({ ...pagDetails }).then(data => {
                const numberOfElementsAlreadyInList = listPublications.length;
                if (data.body?.list && data.body.pageInfoDto.totalElements >= numberOfElementsAlreadyInList) {
                    setListPublications([...listPublications, ...data.body.list]);
                    setPagDetails({
                        ...pagDetails,
                        ...data.body.pageInfoDto
                    });
                };
                setFlagPagDetails(false);
            }).catch(error => {
                setNotificationToast({
                    sev: NOTIFICATION_SEVERITIES[1],
                    msg: error.message
                });
            }).finally(() => {
                loading && setLoading(false);
            });
        }
    }, [pagDetails]);
    
    /**
     * @param {String} id - publication's id
     */
    function selectPublication(id) {
        setPublicationSelectedId(id);
        setModal(true);
    }

    return (
        <main className="col-8 col-md-9 mt-3 ">
            <div className="row mx-auto row-gap-4">
                {loading ?
                    <Loading spaceToTake={LOADING_OPTIONS[1]} />
                    :
                    <Pagination
                        itemsList={listPublications}
                        pagType={PAG_TYPES[0]}
                        pagDetails={pagDetails}
                        changePage={changePage}
                        ComponentToDisplayItem = {props => <NavigateCard selectPublication = {selectPublication} 
                        {...props}/>}
                    />
                }
            </div>
            <Modal modalState={modal} setModalState={setModal}>
                <PublicationModal setModalState={setModal} id={publicationSelectedId} />
            </Modal>
        </main>
    )
}