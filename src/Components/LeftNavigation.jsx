import { useState } from "react";
import { Search, PlusCircle, ChatSquareText, ExclamationCircle, Compass, Gear } from "react-bootstrap-icons";
import SearchPopover from "./Popovers/SearchPopover";
import NotificationsPopover from "./Popovers/NotificationsPopover";
import ConfigurationPopover from "./Popovers/ConfigurationPopover";
import { Link } from "react-router-dom";
import { APP_TITLE, NAV_OPTIONS } from "../Util/UtilTexts";


/**
 * 
 * @returns {JSX.Element} - The rendered left basic nav.
 */
function LeftNavigation() {
    /*I have the same 3 methods and 2 hooks here and in LeftNavigation,
     I don't change them because I think the logic is too simple to separate them all into their proper useHook or context. at least for now.
    */
    const [navItemPopovers, setItemPopovers] = useState('');
    const [username, setUsername] = useState('');

    /**
     * To show a nav item popover
     * @param {String} wichPopover - name of the nav item that need to be showed 
     */
    function showPopover(wichPopover) {
        setItemPopovers(wichPopover);
    }
    /**
     * To hide actual showed popover.
     */
    function hidePopover() {
        setItemPopovers('');
    }

    function searchByUsername(evt) {
        setUsername(evt.target.value);
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
                    <button type="button" className="btn btn-light w-100 text-start fs-5" onClick={() => showPopover('search')}>
                        <Search size={30} />
                        <span className="ms-2">{NAV_OPTIONS[0]}</span>
                    </button>
                    {navItemPopovers === 'search' &&
                        <SearchPopover hidePopover={hidePopover}
                            container="custom-popover-container"
                            username={username}
                            searchByUsername={searchByUsername} />
                    }
                </li>
                <li className="nav-item position-relative">
                    <button type="button" className="btn btn-light w-100 text-start fs-5" onClick={() => showPopover('notifications')}>
                        <ExclamationCircle size={30} />
                        <span className="ms-2">{NAV_OPTIONS[1]}</span>
                    </button>
                    {navItemPopovers === 'notifications' &&
                        <NotificationsPopover hidePopover={hidePopover}
                            container="custom-popover-container" />
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
                    <button type="button" className="btn btn-light w-100 text-start fs-5">
                        <PlusCircle size={30} />
                        <span className="ms-2">{NAV_OPTIONS[4]}</span>
                    </button>
                </li>
                <li className="nav-item">
                    <button type="button" className="btn btn-light w-100 text-start fs-5" onClick={() => showPopover('config')}>
                        <Gear size={30} />
                        <span className="ms-2">{NAV_OPTIONS[5]}</span>
                    </button>
                    {navItemPopovers === 'config' &&
                        <ConfigurationPopover hidePopover={hidePopover}
                            container="custom-popover-container" />
                    }
                </li>
            </ul>
        </nav>
    )
}

export default LeftNavigation;