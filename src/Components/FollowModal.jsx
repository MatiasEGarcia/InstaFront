import { useState } from "react";
import { XSquare } from "react-bootstrap-icons";
import FollowTr from "./FollowTr";
import Pagination from "./Pagination";
import { NOTIFICATION_SEVERITIES, PAG_TYPES } from "../Util/UtilTexts";
import { updateFollowStatus } from "../Service/FollowService";
import { FOLLOWED_STATUS } from "../Util/UtilTexts";
import { useNotification } from "../hooks/useNotification";

/**
 * Component with the content that will be display when we want to see the follow info in a modal.
 * 
 * @param {Function} param.setModalState - function to close currently modal. 
 * @param {Array} param.contentModalList - array with the users.  
 * @param {Function} param.setContentModalList - function to set the array with the users. 
 * @param {Boolean} param.userIsFollower - flag to know if I should show follow's follower or followed user. 
 * @param {Boolean} param.basePagDetails - pagination details. 
 */
export default function FollowModal({ 
    pagDetails,setModalState, contentModalList,setContentModalList, userIsFollower , changePage
}) {
    //popover to show follow status dropdown
    const [showDropdown, setShowDropdown] = useState(''); // should contain the id of the follow
    const setNotificationToast = useNotification();
    
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


    /**
     * Function to change follow status in some record
     * 
     * @param {FOLLOWED_STATUS} newFollowStatus new follow status in follow record. 
     * @param {String} followId follow's id( to know which follow record update).
     */
    function handlerFollowStatusUpdate({newFollowStatus, followId}){
        updateFollowStatus({newFollowStatus, followId}).then(data => {
            const newContentModalList = contentModalList.map((follow) => {
                if(follow.followId === data.body.followId){
                    follow.followStatus = data.body.followStatus;
                }
                return follow;
            });
            setContentModalList([...newContentModalList]);
        }).catch( error => {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[1],
                msg: error.message
            })        
        });
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
                                itemsList = {contentModalList}
                                pagType = {PAG_TYPES[1]} 
                                pagDetails = {pagDetails}
                                changePage = {changePage}
                                divId = {"followModalCardBody"}
                                ComponentToDisplayItem = {(props) => <FollowTr openAndCloseDropdown={openAndCloseDropdown}
                                    handlerFollowStatusUpdate = {handlerFollowStatusUpdate}
                                    showDropdown={showDropdown} userIsFollower={userIsFollower} {...props}/>}/>
                        </tbody>
                    </table>
                </div>
                <XSquare size={30} className="cursor-pointer-hover m-1 position-absolute top-0 end-0"
                    onClick={closeModal} />
            </div>
        </div>

    )
}