import { Search, PlusCircle, ChatSquareText, ExclamationCircle, Compass, Person } from "react-bootstrap-icons";

/**
 * @returns {JSX.Element} - The rendered bottom sticky nav.
 */
function StickyBottomIconNavigation() {
    return (
        <nav className="position-sticky bottom-0 start-0 col-12 d-md-none">
            <ul className="nav justify-content-between bg-light">
                <li>
                    <button type="button" className="btn btn-light w-100 text-start fs-1 px-3">
                        <Search />
                    </button>
                </li>
                <li>
                    <button type="button" className="btn btn-light w-100 text-start fs-1 px-3">
                        <ExclamationCircle />
                    </button>
                </li>
                <li>
                    <button type="button" className="btn btn-light w-100 text-start fs-1 px-3">
                        <ChatSquareText />
                    </button>
                </li>
                <li>
                    <button type="button" className="btn btn-light w-100 text-start fs-1 px-3">
                        <Compass />
                    </button>
                </li>
                <li>
                    <button type="button" className="btn btn-light w-100 text-start fs-1 px-3">
                        <PlusCircle />
                    </button>
                </li>
                <li>
                    <button type="button" className="btn btn-light w-100 text-start fs-1 px-3">
                        <Person />
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default StickyBottomIconNavigation;