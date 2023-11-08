import { APP_TITLE, NAV_OPTIONS } from "../../Util/UtilTexts";
import { Search, ExclamationCircle, ChatSquareText, Compass, PlusCircle, Gear } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import ConfigurationPopover from "../Popovers/ConfigurationPopover";
import SearchPopover from "../Popovers/SearchPopover";
import NotificationsPopover from "../Popovers/NotificationsPopover";
import { useState } from "react";


/**
 * 
 * @returns {JSX.Element} - The rendered left basic nav. 
 */
export default function LeftNavigation() {
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
        <nav className="d-none d-md-block col-md-4 col-xl-2 
                                h-auto border-end bg-light position-relative z-1">{/*position relative for popover*/}
            <ul className="position-sticky top-0 start-0 nav flex-column pt-2 gap-3">
                <li className="nav-item m-3">
                    <Link to="/home" className="btn btn-light">
                        <h2>{APP_TITLE}</h2>
                    </Link>
                </li>
                <li className="nav-item position-relative">
                    <button type="button" className="btn btn-light w-100 text-start fs-5" onClick={() => setShowPopover('search')}>
                        <Search size={30} />
                        <span className="ms-2">{NAV_OPTIONS[0]}</span>
                    </button>
                    {showPopover === 'search' &&
                        <SearchPopover hidePopover={hidePopover}
                            container="custom-popover-container" />
                    }
                </li>
                <li className="nav-item position-relative">
                    <button type="button" className="btn btn-light w-100 text-start fs-5" onClick={() => setShowPopover('notifications')}>
                        <ExclamationCircle size={30} />
                        <span className="ms-2">{NAV_OPTIONS[1]}</span>
                    </button>
                    {showPopover === 'notifications' &&
                        <NotificationsPopover hidePopover={hidePopover}
                            container="custom-popover-container"/>
                    }
                </li>
                <li className="nav-item">
                    <Link to="/chat">
                        <button type="button" className="btn btn-light w-100 text-start fs-5">
                            <ChatSquareText size={30} />
                            <span className="ms-2">{NAV_OPTIONS[2]}</span>
                        </button>
                    </Link>
                </li>
                <li className="nav-item">
                    <button type="button" className="btn btn-light w-100 text-start fs-5">
                        <Compass size={30} />
                        <span className="ms-2">{NAV_OPTIONS[3]}</span>
                    </button>
                </li>
                <li className="nav-item">
                    <Link to="/createPublication" className="btn btn-light w-100 text-start fs-5">
                        <PlusCircle size={30} />
                        <span className="ms-2">{NAV_OPTIONS[4]}</span>
                    </Link>
                </li>
                <li className="nav-item position-relative">
                    <button type="button" className="btn btn-light w-100 text-start fs-5" onClick={() => setShowPopover('config')}>
                        <Gear size={30} />
                        <span className="ms-2">{NAV_OPTIONS[5]}</span>
                    </button>
                    {showPopover === 'config' &&
                        <ConfigurationPopover hidePopover={hidePopover}
                            container="custom-popover-container" />
                    }
                </li>
            </ul>
        </nav>
    )
}   