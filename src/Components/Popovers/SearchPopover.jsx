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
        <div className={`${container} border rounded p-3 gy-2 bg-secondary-subtle`} onMouseLeave={() => hidePopover()}>
            <div className="mb-2">
                <input type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="Search by username"
                    value={username}
                    onChange={(evt) => searchByUsername(evt)} />
            </div>
            <div className="vstack gap-2 h-80 overflow-auto">
                <button className="btn btn-light w-100 d-flex justify-content-between align-items-center">
                    <div>
                        <img height="60px" width="60px" className="rounded-circle"
                            src="/defaultImg/profile.jpg"
                            alt="userImage" />
                        <span className="ps-2 fs-5">Username</span>
                    </div>
                    <span className="btn btn-sm btn-link">
                        Follow
                    </span>
                </button>
            </div>
        </div>
    )
}

export default SearchPopover;