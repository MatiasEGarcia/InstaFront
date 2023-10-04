import UserImageProfile from "../UserImageProfile";
import { follow } from "../../Service/FollowService";


/**
 * Components that returns search popover to use in some navigation.
 * @param {Object} param - The component props.
 * @param {Function} param.hidePopover - function to close popover.
 * @param {String} param.username - username to search.
 * @param {Function} param.setUsername - function to search users.
 * @param {String} param.container - type of container , for bottom navigation or left navigation.
 * @param {Array} param.usersFound - array with users found.
 * @returns {JSX.Element} - search popover.
 */
function SearchPopover({ hidePopover, username, setUsername, container, usersFound, saveFollow}) {
    return (
        <div className={`${container} border rounded p-3 gy-2 bg-secondary-subtle`} onMouseLeave={() => hidePopover()}>
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
                                <span className="btn btn-sm btn-link" onClick={() => saveFollow(user.userId)}>
                                    Follow
                                </span>
                            </button>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SearchPopover;