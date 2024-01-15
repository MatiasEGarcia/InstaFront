import UserImageProfile from "../UserImageProfile";
import { Link } from "react-router-dom";
import { searchUsersByOneCondition } from "../../Service/UserService";
import { useNotification } from "../../hooks/useNotification";
import { useState, useEffect } from "react";
import { NOTIFICATION_SEVERITIES } from "../../Util/UtilTexts";
import { LIKE } from "../../Util/UtilTexts";


/**
 * Components that returns search popover to use in some navigation.
 * @param {Object} param - The component props.
 * @param {Function} param.hidePopover - function to close popover.
 * @param {String} param.container - type of container , for bottom navigation or left navigation.
 * @returns {JSX.Element} - search popover.
 */
function SearchPopover({ hidePopover, container}) {
    const [username, setUsername] = useState('');
    const [usersFound, setUsersFound] = useState([]); // users founded in search popover
    const {setNotificationToast} = useNotification();

    useEffect(() => {
        if (username.length !== 0) {
            searchUsersByOneCondition({
                column: 'username',
                value: username,
                operation: LIKE,
            }).then((data) => {
                if (data.body?.list !== undefined) {
                    setUsersFound(data.body.list);
                } else {
                    console.log(data.headers.get('moreInfo'))//moreInfo: name of the header with the more info
                }
            }).catch((error) => {
                setNotificationToast({
                    sev: NOTIFICATION_SEVERITIES[1],//error
                    msg: error.message,
                })
            })
        } else {
            //to reset usersFoundList
            setUsersFound([]);
        }
    }, [username]);

    return (
        <div className={`${container} border rounded p-2 gy-2 bg-secondary-subtle`} onMouseLeave={() => hidePopover()}>
            <div className="mb-3">
                <input type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="Search by username"
                    value={username}
                    onChange={(evt) => setUsername(evt.target.value)} />
            </div>
            <div className="vstack gap-2 h-80 overflow-auto">
                {usersFound.length === 0
                    ? <div className="text-center">
                        <h4>No users founded</h4>
                    </div>
                    : usersFound.map((user, index) => {
                        return (
                            <button className="btn btn-light w-100 d-flex justify-content-between align-items-center" key={index}>
                                <div>
                                    <UserImageProfile imgWith="60px" imgHeight="60px" img={user.image}/>
                                    <span className="ps-2 fs-5">{user.username}</span>
                                </div>
                                <Link to={`/userHome/${user.id}`} className="btn btn-sm btn-link">
                                    Visit
                                </Link>
                            </button>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SearchPopover;