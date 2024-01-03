import { Search, ExclamationCircle, ChatSquareText, Compass, PlusCircle, Gear } from "react-bootstrap-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import SearchPopover from "../Popovers/SearchPopover";
import NotificationsPopover from "../Popovers/NotificationsPopover";
import ConfigurationPopover from "../Popovers/ConfigurationPopover";


/**
 * 
 * @returns {JSX.Element} - The rendered bottom sticky nav.
 */
export default function StickyBottomIconNavigation() {
    const [showPopover, setShowPopover] = useState('');//should containe name of the popover to show, if is empty then no one.

    function hidePopover() {
        /**
        * After a second it runs this, 
        * but if the mouse re-entered the popover, then it won't close, it's to give the user time to get from the icon to the popover.
        */
        setTimeout(() => {
            setShowPopover('');
        }, 500);
    }

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
                            container="custom-icon-popover-container" />
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
                    <Link to="/navigate" type="button" className="btn btn-light w-100 text-start fs-1 px-3">
                        <Compass />
                    </Link>
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
                            container="custom-icon-popover-container" />
                    }
                </li>
            </ul>
        </nav>
    )
};