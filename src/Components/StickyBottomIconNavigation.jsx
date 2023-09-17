import { Search, PlusCircle, ChatSquareText, ExclamationCircle, Compass, Gear } from "react-bootstrap-icons";
import { useState } from "react";
import SearchPopover from "./Popovers/SearchPopover";
import NotificationsPopover from "./Popovers/NotificationsPopover";
import ConfigurationPopover from "./Popovers/ConfigurationPopover";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

/**
 * @returns {JSX.Element} - The rendered bottom sticky nav.
 */
function StickyBottomIconNavigation() {
    /*I have the same 3 methods and 2 hooks here and in LeftNavigation,
     I don't change them because I think the logic is too simple to separate them all into their proper useHook or context. at least for now.
    */
    const [navItemPopovers, setItemPopovers] = useState('');
    const [username, setUsername] = useState('');
    const {logout} = useAuth();


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
        /**
         * After a second it runs this, 
         * but if the mouse re-entered the popover, then it won't close, it's to give the user time to get from the icon to the popover.
         */
        setTimeout(() => {
            setItemPopovers('');
        }, 500);
    }

    function searchByUsername(evt) {
        setUsername(evt.target.value);
    }


    return (
        <nav className="position-sticky bottom-0 start-0 col-12 d-md-none">
            <ul className="nav justify-content-between bg-light">
                <li className="nav-item position-relative">
                    <button type="button" className={`btn btn-light w-100 text-start fs-1 px-3 ${navItemPopovers === 'search' && 'bg-secondary'}`}
                        onClick={() => showPopover('search')}>
                        <Search />
                    </button>
                    {navItemPopovers === 'search' &&
                        <SearchPopover hidePopover={hidePopover}
                            container="custom-icon-popover-container"
                            username={username}
                            searchByUsername={searchByUsername} />
                    }
                </li>
                <li className="nav-item position-relative">
                    <button type="button" className={`btn btn-light w-100 text-start fs-1 px-3 ${navItemPopovers === 'notifications' && 'bg-secondary'}`}
                        onClick={() => showPopover('notifications')}>
                        <ExclamationCircle />
                    </button>
                    {navItemPopovers === 'notifications' &&
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
                    <button type="button" className={`btn btn-light w-100 text-start fs-1 px-3 ${navItemPopovers === 'config' && 'bg-secondary'}`}
                        onClick={() => showPopover('config')}>
                        <Gear />
                    </button>
                    {navItemPopovers === 'config' &&
                        <ConfigurationPopover hidePopover={hidePopover}
                            container="custom-icon-popover-container" 
                            logoutAction = {logout}/>
                    }
                </li>
            </ul>
        </nav>
    )
}

export default StickyBottomIconNavigation;