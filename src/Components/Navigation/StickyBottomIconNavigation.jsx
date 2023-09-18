import { Search, PlusCircle, ChatSquareText, ExclamationCircle, Compass, Gear } from "react-bootstrap-icons";
import SearchPopover from "../Popovers/SearchPopover";
import NotificationsPopover from "../Popovers/NotificationsPopover";
import ConfigurationPopover from "../Popovers/ConfigurationPopover";
import { Link } from "react-router-dom";

/**
 * @returns {JSX.Element} - The rendered bottom sticky nav.
 */
function StickyBottomIconNavigation({
    username,
    setUsername,
    usersFound,
    logout,
    showPopover,
    setShowPopover,
    hidePopover
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
                            usersFound={usersFound} />
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
                    <button type="button" className="btn btn-light w-100 text-start fs-1 px-3">
                        <PlusCircle />
                    </button>
                </li>
                <li className="nav-item position-relative">
                    <button type="button" className={`btn btn-light w-100 text-start fs-1 px-3 ${showPopover === 'config' && 'bg-secondary'}`}
                        onClick={() => setShowPopover('config')}>
                        <Gear />
                    </button>
                    {showPopover === 'config' &&
                        <ConfigurationPopover hidePopover={hidePopover}
                            container="custom-icon-popover-container"
                            logoutAction={logout} />
                    }
                </li>
            </ul>
        </nav>
    )
}

export default StickyBottomIconNavigation;