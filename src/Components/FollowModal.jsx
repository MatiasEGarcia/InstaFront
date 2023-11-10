import { FOLLOWED_STATUS } from "../Util/UtilTexts";
import CardUserSimple from "./CardUserSimple";
import { ArrowDownSquare, XSquare } from "react-bootstrap-icons";
import { useState } from "react";

/**
 * Component with the content that will be display when we want to see the follow info in a modal.
 * 
 * @param {Function} setModalState - function to close currently modal. 
 * @param {Array} contentModalList - array with the users.  
 * @param {Boolean} userIsFollower - flag to know if I should show follow's follower or followed user. 
 */
export default function FollowModal({ setModalState, contentModalList, userIsFollower }) {
    //popover to show follow status dropdown
    const [showPopover, setShowPopover] = useState(''); // should contain the id of the follow

    /**
     * Function to open the change status dropdown, and close if is already open. 
     * @param {String} followId - if of the follow record/entity 
     */
    function openAndCloseDropdown(followId) {
        if (showPopover === followId) {
            setShowPopover('');
        } else {
            setShowPopover(followId)
        }
    }

    function closeModal() {
        setModalState(false);
    }

    return (
        <div className="w-80 w-md-30 h-80 d-flex justify-content-center">
            <div className="card w-100 h-100 border position-relative">
                <div className="card-header text-center">
                    <h2>List of users</h2>
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">User</th>
                                <th scope="col">Follow status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contentModalList.length === 0
                                ? <h5>No users</h5>
                                : contentModalList.map((follow) => {
                                    return (
                                        <tr key={follow.followId}>
                                            <th scope="row">
                                                {userIsFollower === true
                                                    ? <CardUserSimple userId={follow.followed.userId}
                                                        userImage={follow.followed.image}
                                                        username={follow.followed.username} />
                                                    : <CardUserSimple userId={follow.follower.userId}
                                                        userImage={follow.follower.image}
                                                        username={follow.follower.username} />}
                                            </th>
                                            <td>
                                                <p className="my-1">{follow.followStatus}</p>
                                                {!userIsFollower &&
                                                    <div className="border border-dark rounded 
                                                                    position-relative w-80
                                                                    cursor-pointer-hover">
                                                        <div className="d-flex align-items-center p-1"
                                                            onClick={() => openAndCloseDropdown(follow.followId)}>
                                                            <p className="m-0 me-1">Change status</p>
                                                            <ArrowDownSquare />
                                                        </div>
                                                        {showPopover === follow.followId &&
                                                            <ul className="position-absolute 
                                                                           border border-dark-subtle rounded 
                                                                           w-100 border-top-0 p-0"
                                                                style={{ listStyle: 'none' }}>
                                                                {FOLLOWED_STATUS.map((status) => {
                                                                    if (follow.followStatus === status) {
                                                                        return
                                                                    }else if(status == FOLLOWED_STATUS[3]){
                                                                        return
                                                                    }

                                                                    return (
                                                                        <li key={status} className="text-center">
                                                                            {status.toUpperCase()}
                                                                        </li>
                                                                    );
                                                                })}
                                                            </ul>
                                                        }
                                                    </div>
                                                }
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
                <XSquare size={30} className="cursor-pointer-hover m-1 position-absolute top-0 end-0"
                    onClick={closeModal} />
            </div>
        </div>

    )
}