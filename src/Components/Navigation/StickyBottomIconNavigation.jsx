import { Search, PlusCircle, ChatSquareText, ExclamationCircle, Compass, Gear } from "react-bootstrap-icons";
import SearchPopover from "../Popovers/SearchPopover";
import NotificationsPopover from "../Popovers/NotificationsPopover";
import ConfigurationPopover from "../Popovers/ConfigurationPopover";
import { Link } from "react-router-dom";

/**
 * @param {Object} param - The component props.
 * @param {String} param.username - username value for input in search popover.
 * @param {Function} param.setUsername - function to change the value in username.
 * @param {Array} param.usersFound - array with users found in search popover.
 * @param {Function} param.logout - logout function for configuration popover.
 * @param {String} param.showPopover - wich popover should be active.
 * @param {Function} param.setShowPopover - function to change wich popover should be active.
 * @param {Function} param.hidePopover - function to hide the active popover.
 * @param {String} param.userVisibiliy - if authenticated user is private or public.
 * @returns {JSX.Element} - The rendered bottom sticky nav.
 */
function StickyBottomIconNavigation({
    username,
    setUsername,
    usersFound,
    logout,
    showPopover,
    setShowPopover,
    hidePopover,
    userVisibiliy,
    setUserVisibility,
    saveFollow
}) {



    return (
        <nav className="position-sticky bottom-0 start-0 col-12 d-md-none">
            <ul className="nav justify-content-between bg-light">
                <li className="nav-item position-relative">
                    <button type="button" className={`btn btn-light w-100 text-start fs-1 px-3 ${showPopover === 'search' && 'bg-secondary'}`}
                        onClick={() => setShowPopover('search')}>
                        <Search />
                    </button>
                    {showPopover === 'search' &&
                        <SearchPopover hidePopover={hidePopover}
                            container="custom-icon-popover-container"
                            username={username}
                            setUsername={setUsername}
                            usersFound={usersFound}
                            saveFollow = {saveFollow} />
                    }
                </li>
                <li className="nav-item position-relative">
                    <button type="button" className={`btn btn-light w-100 text-start fs-1 px-3 ${showPopover === 'notifications' && 'bg-secondary'}`}
                        onClick={() => setShowPopover('notifications')}>
                        <ExclamationCircle />
                    </button>
                    {showPopover === 'notifications' &&
                        <NotificationsPopover hidePopover={hidePopover}
                            container="custom-icon-popover-container" />
                    }
                </li>
                <li className="nav-item">
                    <Link to="/chat">
                        <button type="button" className="btn btn-light w-100 text-start fs-1 px-3">
                            <ChatSquareText />
                        </button>
                    </Link>
                </li>
                <li className="nav-item">
                    <button type="button" className="btn btn-light w-100 text-start fs-1 px-3">
                        <Compass />
                    </button>
                </li>
                <li className="nav-item">
                    <Link to="/createPublication" className="btn btn-light w-100 text-start fs-1 px-3">
                        <PlusCircle />
                    </Link>
                </li>
                <li className="nav-item position-relative">
                    <button type="button" className={`btn btn-light w-100 text-start fs-1 px-3 ${showPopover === 'config' && 'bg-secondary'}`}
                        onClick={() => setShowPopover('config')}>
                        <Gear />
                    </button>
                    {showPopover === 'config' &&
                        <ConfigurationPopover hidePopover={hidePopover}
                            container="custom-icon-popover-container"
                            logoutAction={logout}
                            userVisibiliy = {userVisibiliy}
                            setUserVisibility = {setUserVisibility} />
                    }
                </li>
            </ul>
        </nav>
    )
}

export default StickyBottomIconNavigation;