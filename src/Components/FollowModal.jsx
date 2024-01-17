import { useRef, useState } from "react";
import { XSquare } from "react-bootstrap-icons";
import { PAG_TYPES } from "../Util/UtilTexts";
import useUserHomeInfo from "../hooks/useUserHomeInfo";
import FollowTr from "./FollowTr";
import Pagination from "./Pagination";

/**
 * @param {Function} param.setModalState - function to close currently modal.
 * @returns {JSX.Element}  Component with the content that will be display when we want to see the follow info in a modal.
 */
export default function FollowModal({
    setModalState
}) {
    //popover to show follow status dropdown
    const [showDropdown, setShowDropdown] = useState(''); // should contain the id of the follow
    const { followModalContent, //follow records
        changePage,
        pagDetails // follow recors pagDetails
    } = useUserHomeInfo();
    const refFollowCardBody = useRef();

    /**
     * Function to open the change status dropdown, and close if is already open. 
     * @param {String} followId - if of the follow record/entity 
     */
    function openAndCloseDropdown(followId) {
        if (showDropdown === followId) {
            setShowDropdown('');
        } else {
            setShowDropdown(followId)
        }
    }

    function closeModal() {
        setModalState(prev => !prev);
    }


    return (
        <div className="w-80 w-md-35 h-80 d-flex justify-content-center">
            <div className="card w-100 h-100 border position-relative">
                <div className="card-header text-center">
                    <h2>List of users</h2>
                </div>
                <div className="card-body overflow-auto" ref={refFollowCardBody}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">User</th>
                                <th scope="col">Follow status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Pagination
                                itemsList={followModalContent}
                                pagType={PAG_TYPES[0]}
                                pagDetails={pagDetails}
                                changePage={changePage}
                                observerRoot={refFollowCardBody.current}
                                ComponentToDisplayItem={(props) => <FollowTr openAndCloseDropdown={openAndCloseDropdown}
                                    showDropdown={showDropdown} {...props} />} />
                        </tbody>
                    </table>
                </div>
                <XSquare size={30} className="cursor-pointer-hover m-1 position-absolute top-0 end-0"
                    onClick={closeModal} />
            </div>
        </div>

    )
}