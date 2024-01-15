import { FOLLOWED_STATUS } from "../Util/UtilTexts";
import { ArrowDownSquare } from "react-bootstrap-icons";
import CardUserSimple from "./CardUserSimple";
import useUserHomeInfo from "../hooks/useUserHomeInfo";

/**
 * 
 * @param {Object} param.item item to show.
 * @param {Function} param.openAndCloseDropdown to open Dropdown and show the differents status to choose. 
 * @param {String} param.showDropdown id of the follow record to show the dropdown.
 * @returns {JSX.Element} tr for follow model's table of follows records
 */
export default function FollowTr({item, openAndCloseDropdown,showDropdown}) {//ITEM is follow record
    const {handlerFollowStatusUpdate, userIsFollower} = useUserHomeInfo();

    

    return (
        <tr key={item.id}>
            <th scope="row">
                {userIsFollower === true
                    ? <CardUserSimple id={item.followed.id}
                        userImage={item.followed.image}
                        username={item.followed.username}
                        size = {{width:"40px" , height : "40px"}} />
                    : <CardUserSimple id={item.follower.id}
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
                                    if (item.followStatus === status) {
                                        return
                                    } else if (status == FOLLOWED_STATUS[3]) {
                                        return
                                    }

                                    return (
                                        <li key={status} className="text-center"
                                             onClick={() => handlerFollowStatusUpdate({newFollowStatus : status, followId : item.id})}>
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