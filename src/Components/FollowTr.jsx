import { ArrowDownSquare } from "react-bootstrap-icons";
import { FOLLOWED_STATUS, FOLLOW_STATUS_LABEL } from "../Util/UtilTexts";
import CardUserSimple from "./CardUserSimple";

/**
 * 
 * @param {Object} param.item item to show.
 * @param {Function} param.openAndCloseDropdown to open Dropdown and show the differents status to choose. 
 * @param {String} param.showDropdown id of the follow record to show the dropdown.
 * @param {Function} param.handlerFollowStatusUpdate Function to change follow status in some record.
 * @param {boolean} param.userIsFollower to know if auth user is follower or followed, true if is follower,otherwise followed
 * @returns {JSX.Element} tr for follow model's table of follows records
 */
export default function FollowTr({
    item,
    openAndCloseDropdown,
    showDropdown,
    handlerFollowStatusUpdate,
    userIsFollower
}) {//ITEM is follow record

    return (
        <tr key={item.id}>
            <th scope="row">
                {userIsFollower === true
                    ? <CardUserSimple id={item.followed.id}
                        userImage={item.followed.image}
                        username={item.followed.username}
                        size={{ width: "40px", height: "40px" }} />
                    : <CardUserSimple id={item.follower.id}
                        userImage={item.follower.image}
                        username={item.follower.username}
                        size={{ width: "40px", height: "40px" }} />}
            </th>
            <td>
                {item.followStatus === FOLLOWED_STATUS[1] && <p className="my-1">{FOLLOW_STATUS_LABEL.REJECTED}</p>}
                {item.followStatus === FOLLOWED_STATUS[2] && <p className="my-1">{FOLLOW_STATUS_LABEL.IN_PROCESS}</p>}
                {!userIsFollower &&
                    <div className="border border-dark rounded 
                                     position-relative w-80
                                     cursor-pointer-hover">
                        <div className="d-flex align-items-center p-1"
                            onClick={() => openAndCloseDropdown(item.id)}>
                            <p className="m-0 me-1">Change status</p>
                            <ArrowDownSquare />
                        </div>
                        {showDropdown === item.id &&
                            <ul className="position-absolute 
                                            bg-body
                                            border border-dark-subtle rounded 
                                            w-100 p-0"
                                style={{ listStyle: 'none' }}>
                                {FOLLOWED_STATUS.map((status) => {
                                    //if status is not asked or if the status of the item is already the status iterated don't show it.
                                    if (item.followStatus === status || status == FOLLOWED_STATUS[3]) {
                                        return
                                    }

                                    return (
                                        <li key={status} className="text-center"
                                            onClick={() => handlerFollowStatusUpdate({ newFollowStatus: status, followId: item.id })}>
                                            {status === FOLLOWED_STATUS[0] && <p className="my-1">{FOLLOW_STATUS_LABEL.ACCEPTED}</p>}
                                            {status === FOLLOWED_STATUS[1] && <p className="my-1">{FOLLOW_STATUS_LABEL.REJECTED}</p>}
                                            {status === FOLLOWED_STATUS[2] && <p className="my-1">{FOLLOW_STATUS_LABEL.IN_PROCESS}</p>}
                                        </li>
                                    );
                                })}
                            </ul>
                        }
                    </div>
                }
            </td>
        </tr>
    )
}