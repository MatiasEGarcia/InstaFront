import { FOLLOWED_STATUS } from "../Util/UtilTexts";
import { ArrowDownSquare } from "react-bootstrap-icons";
import CardUserSimple from "./CardUserSimple";

export default function FollowTr({item, openAndCloseDropdown,showPopover, userIsFollower}) {//ITEM is follow record

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
                        {showPopover === item.followId &&
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
    )
}