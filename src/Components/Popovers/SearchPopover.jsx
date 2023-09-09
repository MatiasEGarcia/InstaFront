/**
 * Components that returns search popover to use in some navigation.
 * @param {Object} param0 - The component props.
 * @param {Function} param.hidePopover - function to close popover
 * @param {String} param.username - username to search
 * @param {Function} param.searchByUsername - function to search user.
 * @param {String} param.container - type of container , for bottom navigation or left navigation
 * @returns {JSX.Element} - search popover.
 */
function SearchPopover({ hidePopover, username, searchByUsername, container }) {
    return (
        <div className={`${container} card`} onMouseLeave={() => hidePopover()}>
            <div className="card-header">
                <input type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="Search by username"
                    value={username}
                    onChange={(evt) => searchByUsername(evt)} />
            </div>
            <div className="card-body overflow-auto p-0">

                <button className="btn btn-light w-100 d-flex justify-content-between">
                    <div>
                        <img height="60px" width="60px" className="rounded-circle"
                            src="/defaultImg/profile.jpg"
                            alt="userImage" />
                        <span className="ps-2 fs-5">Username</span>
                    </div>
                    <button className="btn btn-sm btn-link">
                        Follow
                    </button>
                </button>
                <button className="btn btn-light w-100 d-flex justify-content-between">
                    <div>
                        <img height="60px" width="60px" className="rounded-circle"
                            src="/defaultImg/profile.jpg"
                            alt="userImage" />
                        <span className="ps-2 fs-5">Username</span>
                    </div>
                    <button className="btn btn-sm btn-link">
                        Follow
                    </button>
                </button>
                <button className="btn btn-light w-100 d-flex justify-content-between">
                    <div>
                        <img height="60px" width="60px" className="rounded-circle"
                            src="/defaultImg/profile.jpg"
                            alt="userImage" />
                        <span className="ps-2 fs-5">Username</span>
                    </div>
                    <button className="btn btn-sm btn-link">
                        Follow
                    </button>
                </button>
                <button className="btn btn-light w-100 d-flex justify-content-between">
                    <div>
                        <img height="60px" width="60px" className="rounded-circle"
                            src="/defaultImg/profile.jpg"
                            alt="userImage" />
                        <span className="ps-2 fs-5">Username</span>
                    </div>
                    <button className="btn btn-sm btn-link">
                        Follow
                    </button>
                </button>
                <button className="btn btn-light w-100 d-flex justify-content-between">
                    <div>
                        <img height="60px" width="60px" className="rounded-circle"
                            src="/defaultImg/profile.jpg"
                            alt="userImage" />
                        <span className="ps-2 fs-5">Username</span>
                    </div>
                    <button className="btn btn-sm btn-link">
                        Follow
                    </button>
                </button>
            </div>
        </div>
    )
}

export default SearchPopover;