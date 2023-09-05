import { Search, PlusCircle, ChatSquareText, ExclamationCircle, Compass, Person } from "react-bootstrap-icons";

function MainContainer() {
    return (
        <div className="container-fluid">
            <div className="row vh-100 position-relative">
                <nav className="d-none d-md-block col-md-3 col-xl-2 h-75 border-end bg-light">
                    <ul class="nav flex-column pt-2 gap-3">
                        <li class="nav-item m-3">
                            <h2>FrontReact</h2>
                        </li>
                        <li class="nav-item">
                            <button type="button" className="btn btn-light w-100 text-start fs-5">
                                <Search />
                                <span className="ms-2">Search</span>
                            </button>
                        </li>
                        <li class="nav-item">
                            <button type="button" className="btn btn-light w-100 text-start fs-5">
                                <ExclamationCircle />
                                <span className="ms-2">Notifications</span>
                            </button>
                        </li>
                        <li class="nav-item">
                            <button type="button" className="btn btn-light w-100 text-start fs-5">
                                <ChatSquareText />
                                <span className="ms-2">Chats</span>
                            </button>
                        </li>
                        <li class="nav-item">
                            <button type="button" className="btn btn-light w-100 text-start fs-5">
                                <Compass />
                                <span className="ms-2">Navigate</span>
                            </button>
                        </li>
                        <li class="nav-item">
                            <button type="button" className="btn btn-light w-100 text-start fs-5">
                                <PlusCircle />
                                <span className="ms-2">Create</span>
                            </button>
                        </li>
                        <li class="nav-item">
                            <button type="button" className="btn btn-light w-100 text-start fs-5">
                                <Person />
                                <span className="ms-2">User</span>
                            </button>
                        </li>
                    </ul>
                </nav>
                <main className="col-12 col-md-9 col-lg-7">



                </main>
                <aside className="d-none d-lg-block col-lg-2 col-xl-3">parte de las tarjetas</aside>
                <nav className="position-absolute bottom-0 start-0 col-12 d-md-none">
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
            </div>
        </div>
    )
}

export default MainContainer;