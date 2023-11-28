import { useState } from "react";
import { XSquare } from "react-bootstrap-icons";
import { PAG_TYPES } from "../Util/UtilTexts";
import useUserHomeInfo from "../hooks/useUserHomeInfo";
import FollowTr from "./FollowTr";
import Pagination from "./Pagination";

/**
 * @param {Function} param.setModalState - function to close currently modal.
 * @param {Boolean} param.pagDetails - pagination details. 
 * @param {Function} changePage - function to change page in the Pagination.
 * @returns {JSX.Element}  Component with the content that will be display when we want to see the follow info in a modal.
 */
export default function FollowModal({ 
    pagDetails,setModalState, changePage
}) {
    //popover to show follow status dropdown
    const [showDropdown, setShowDropdown] = useState(''); // should contain the id of the follow
    const {followModalContent} = useUserHomeInfo();

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
        setModalState(false);
    }


    return (
        <div className="w-80 w-md-35 h-80 d-flex justify-content-center">
            <div className="card w-100 h-100 border position-relative">
                <div className="card-header text-center">
                    <h2>List of users</h2>
                </div>
                <div id="followModalCardBody" className="card-body overflow-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">User</th>
                                <th scope="col">Follow status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Pagination 
                                itemsList = {followModalContent}
                                pagType = {PAG_TYPES[1]} 
                                pagDetails = {pagDetails}
                                changePage = {changePage}
                                divId = {"followModalCardBody"}
                                ComponentToDisplayItem = {(props) => <FollowTr openAndCloseDropdown={openAndCloseDropdown}
                                    showDropdown={showDropdown} {...props}/>}/>
                        </tbody>
                    </table>
                </div>
                <XSquare size={30} className="cursor-pointer-hover m-1 position-absolute top-0 end-0"
                    onClick={closeModal} />
            </div>
        </div>

    )
}