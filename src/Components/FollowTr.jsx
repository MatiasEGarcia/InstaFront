import { FOLLOWED_STATUS } from "../Util/UtilTexts";
import { ArrowDownSquare } from "react-bootstrap-icons";
import CardUserSimple from "./CardUserSimple";

/**
 * 
 * @param {Object} param.item item to show.
 * @param {Function} param.openAndCloseDropdown to open Dropdown and show the differents status to choose. 
 * @param {String} param.showDropdown id of the follow record to show the dropdown. 
 * @param {Boolean} param.userIsFollower to know if the auth user is the followed or the follower , and decide to show status 
 * to update or not(for example if the auth user is the follower, it cannot update the followstatus).
 * @param {Function} param.handlerFollowStatusUpdate function to update the follow's followStatus. 
 * @returns 
 */
export default function FollowTr({item, openAndCloseDropdown,showDropdown, userIsFollower, handlerFollowStatusUpdate}) {//ITEM is follow record

    return (
        <tr key={item.followId}>
            <th scope="row">
                {userIsFollower === true
                    ? <CardUserSimple userId={item.followed.userId}
                        userImage={item.followed.image}
                        username={item.followed.username}
                        size = {{width:"40px" , height : "40px"}} />
                    : <CardUserSimple userId={item.follower.userId}
                        userImage={item.follower.image}
                        username={item.follower.username}
                        size = {{width:"40px" , height : "40px"}} />}
            </th>
            <td>
                <p className="my-1">{item.followStatus}</p>
                {!userIsFollower &&
                    <div className="border border-dark rounded 
                                     position-relative w-80
                                     cursor-pointer-hover">
                        <div className="d-flex align-items-center p-1"
                            onClick={() => openAndCloseDropdown(item.followId)}>
                            <p className="m-0 me-1">Change status</p>
                            <ArrowDownSquare />
                        </div>
                        {showDropdown === item.followId &&
                            <ul className="position-absolute 
                                            bg-body
                                            border border-dark-subtle rounded 
                                            w-100 p-0"
                                style={{ listStyle: 'none' }}>
                                {FOLLOWED_STATUS.map((status) => {
                                    if (item.followStatus === status) {
                                        return
                                    } else if (status == FOLLOWED_STATUS[3]) {
                                        return
                                    }

                                    return (
                                        <li key={status} className="text-center"
                                             onClick={() => handlerFollowStatusUpdate({newFollowStatus : status, followId : item.followId})}>
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
    )
}