import { Search, PlusCircle, ChatSquareText, ExclamationCircle, Compass, Person } from "react-bootstrap-icons";

/**
 * 
 * @returns {JSX.Element} - The rendered left basic nav.
 */
function LeftNavigation() {
    return (
        <nav className="d-none d-md-block col-md-4 col-xl-2 
                                h-auto border-end bg-light">
            <ul className="position-sticky top-0 start-0 nav flex-column pt-2 gap-3">
                <li className="nav-item m-3">
                    <h2>FrontReact</h2>
                </li>
                <li className="nav-item">
                    <button type="button" className="btn btn-light w-100 text-start fs-5">
                        <Search size={30} />
                        <span className="ms-2">Search</span>
                    </button>
                </li>
                <li className="nav-item">
                    <button type="button" className="btn btn-light w-100 text-start fs-5">
                        <ExclamationCircle size={30} />
                        <span className="ms-2">Notifications</span>
                    </button>
                </li>
                <li className="nav-item">
                    <button type="button" className="btn btn-light w-100 text-start fs-5">
                        <ChatSquareText size={30} />
                        <span className="ms-2">Chats</span>
                    </button>
                </li>
                <li className="nav-item">
                    <button type="button" className="btn btn-light w-100 text-start fs-5">
                        <Compass size={30} />
                        <span className="ms-2">Navigate</span>
                    </button>
                </li>
                <li className="nav-item">
                    <button type="button" className="btn btn-light w-100 text-start fs-5">
                        <PlusCircle size={30} />
                        <span className="ms-2">Create</span>
                    </button>
                </li>
                <li className="nav-item">
                    <button type="button" className="btn btn-light w-100 text-start fs-5">
                        <Person size={30} />
                        <span className="ms-2">User</span>
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default LeftNavigation;