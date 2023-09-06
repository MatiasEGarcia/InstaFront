import PublicationCard from "./PublicationCard";

/**
 * 
 * @returns {JSX.Element} - The rendered main part of the Home page
 */
function HomeMain() {
    return (
        <main className="col-12 col-md-8 col-xl-10">
            <div className="row">
                <div className="col-12 col-lg-8 
                                d-flex flex-column align-items-center gap-5
                                mt-5">
                    <PublicationCard width="w-75 w-sm-75 w-xl-50" />
                    <PublicationCard width="w-75 w-sm-75 w-lg-50" />
                    <PublicationCard width="w-75 w-sm-75 w-lg-50" />
                    <PublicationCard width="w-75 w-sm-75 w-lg-50" />
                    <PublicationCard width="w-75 w-sm-75 w-lg-50" />
                    <PublicationCard width="w-75 w-sm-75 w-lg-50" />
                    <PublicationCard width="w-75 w-sm-75 w-lg-50" />
                    <PublicationCard width="w-75 w-sm-75 w-lg-50" />
                    <PublicationCard width="w-75 w-sm-75 w-lg-50" />
                </div>
                <aside className="d-none d-lg-block col-lg-4 mt-5">
                    <ul className="nav flex-column gap-3">
                        <li className="nav-item">
                            <button className="btn btn-light w-100 d-flex justify-content-between">
                                <div>
                                    <img height="60px" width="60px" className="rounded-circle"
                                        src="/defaultImg/profile.jpg"
                                        alt="userImage" />
                                    <span className="ps-2 fs-5">Username</span>
                                </div>
                                <button className="btn btn-link">
                                    Follow
                                </button>
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-light w-100 d-flex justify-content-between">
                                <div>
                                    <img height="60px" width="60px" className="rounded-circle"
                                        src="/defaultImg/profile.jpg"
                                        alt="userImage" />
                                    <span className="ps-2 fs-5">Username</span>
                                </div>
                                <button className="btn btn-link">
                                    Follow
                                </button>
                            </button>
                        </li>
                    </ul>
                </aside>
            </div>
        </main>
    )
}

export default HomeMain;