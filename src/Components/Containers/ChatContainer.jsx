import { PencilSquare, InfoCircle, House } from "react-bootstrap-icons";
import { Link } from 'react-router-dom';

function ChatContainer() {
    return (
        <div className="container-lg">
            <div className="row">
                <nav className="col-4 col-md-3 pt-2 border vh-100">
                    <Link to="/home" className="link-underline link-underline-opacity-0">
                        <button className="btn btn-light w-100 d-flex justify-content-center justify-content-md-between ">
                            <House size={40} />
                            <h2 className="ps-2 d-none d-lg-block">
                                FrontReact
                            </h2>
                        </button>
                    </Link>
                    <div className="p-2 d-flex justify-content-center justify-content-md-between">
                        <span className="fs-4 d-none d-md-block">Username</span>
                        <button className="btn">
                            <PencilSquare size={40} />
                        </button>
                    </div>
                    <hr />
                    <div className="vstack h-75 overflow-auto">
                        <div className="pe-4">
                            <button className="btn btn-light d-flex w-100">
                                <div className="position-relative">
                                    <img height="60px" width="60px" className="rounded-circle"
                                        src="/defaultImg/profile.jpg"
                                        alt="userImage" />
                                    <span className="d-lg-none badge bg-danger rounded-pill 
                                                    position-absolute top-0 start-100">14</span>
                                </div>
                                <div className="d-none d-lg-block ps-1 w-100 text-start position-relative">
                                    <p className="mb-1">Username</p>
                                    <p className="m-0"><small>LastMessage</small></p>
                                    <span className="badge bg-danger rounded-pill 
                                                    position-absolute top-0 start-100">14</span>
                                </div>
                            </button>
                        </div>
                        <div className="p-2">Second item</div>
                        <div className="p-2">Third item</div>
                        <div className="p-2">First item</div>
                        <div className="p-2">Second item</div>
                        <div className="p-2">Third item</div>
                        <div className="p-2">First item</div>
                        <div className="p-2">Second item</div>
                        <div className="p-2">Third item</div>
                        <div className="p-2">First item</div>
                        <div className="p-2">Second item</div>
                        <div className="p-2">Third item</div>
                        <div className="p-2">First item</div>
                        <div className="p-2">Second item</div>
                        <div className="p-2">Third item</div>
                        <div className="p-2">First item</div>
                    </div>
                </nav>
                <main className="col-8 col-md-9">
                    <div className="card w-100 vh-100">
                        <div className="card-header d-flex justify-content-between ">
                            <div>
                                <img height="60px" width="60px" className="rounded-circle"
                                    src="/defaultImg/profile.jpg"
                                    alt="userImage" />
                                <span className="ps-2 fs-5">Username</span>
                            </div>
                            <button className="btn">
                                <InfoCircle className="align-self-center" size={35} />
                            </button>
                        </div>
                        <div className="card-body overflow-auto">
                            <div className="hstack gap-1 mb-2">
                                <div>
                                    <img height="60px" width="60px" className="rounded-circle "
                                        src="/defaultImg/profile.jpg"
                                        alt="userImage" />
                                </div>
                                <div className="border rounded p-2">
                                    <p className="m-0">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem, asperiores?</p>
                                </div>
                            </div>
                            <div className="hstack gap-1 ps-5 mb-2">
                                <div className="border rounded p-2">
                                    <p className="m-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro obcaecati reprehenderit atque ullam deleniti saepe ex fugit sunt perspiciatis dolores!</p>
                                </div>
                                <div>
                                    <img height="60px" width="60px" className="rounded-circle "
                                        src="/defaultImg/profile.jpg"
                                        alt="userImage" />
                                </div>
                            </div>
                            <div className="hstack gap-1">
                                <div>
                                    <img height="60px" width="60px" className="rounded-circle "
                                        src="/defaultImg/profile.jpg"
                                        alt="userImage" />
                                </div>
                                <div><p className="m-0">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem, asperiores?</p></div>
                            </div>
                            <div className="hstack gap-1 ps-5">
                                <div className="text-end ms-auto">
                                    <p className="m-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro obcaecati reprehenderit atque ullam deleniti saepe ex fugit sunt perspiciatis dolores!</p>
                                </div>
                                <div>
                                    <img height="60px" width="60px" className="rounded-circle "
                                        src="/defaultImg/profile.jpg"
                                        alt="userImage" />
                                </div>
                            </div>
                            <div className="hstack gap-1">
                                <div>
                                    <img height="60px" width="60px" className="rounded-circle "
                                        src="/defaultImg/profile.jpg"
                                        alt="userImage" />
                                </div>
                                <div><p className="m-0">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem, asperiores?</p></div>
                            </div>
                            <div className="hstack gap-1 ps-5">
                                <div className="text-end ms-auto">
                                    <p className="m-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro obcaecati reprehenderit atque ullam deleniti saepe ex fugit sunt perspiciatis dolores!</p>
                                </div>
                                <div>
                                    <img height="60px" width="60px" className="rounded-circle "
                                        src="/defaultImg/profile.jpg"
                                        alt="userImage" />
                                </div>
                            </div>
                            <div className="hstack gap-1">
                                <div>
                                    <img height="60px" width="60px" className="rounded-circle "
                                        src="/defaultImg/profile.jpg"
                                        alt="userImage" />
                                </div>
                                <div><p className="m-0">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem, asperiores?</p></div>
                            </div>
                            <div className="hstack gap-1 ps-5">
                                <div className="text-end ms-auto">
                                    <p className="m-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro obcaecati reprehenderit atque ullam deleniti saepe ex fugit sunt perspiciatis dolores!</p>
                                </div>
                                <div>
                                    <img height="60px" width="60px" className="rounded-circle "
                                        src="/defaultImg/profile.jpg"
                                        alt="userImage" />
                                </div>
                            </div>
                            <div className="hstack gap-1">
                                <div>
                                    <img height="60px" width="60px" className="rounded-circle "
                                        src="/defaultImg/profile.jpg"
                                        alt="userImage" />
                                </div>
                                <div><p className="m-0">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem, asperiores?</p></div>
                            </div>
                            <div className="hstack gap-1 ps-5">
                                <div className="text-end ms-auto">
                                    <p className="m-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro obcaecati reprehenderit atque ullam deleniti saepe ex fugit sunt perspiciatis dolores!</p>
                                </div>
                                <div>
                                    <img height="60px" width="60px" className="rounded-circle "
                                        src="/defaultImg/profile.jpg"
                                        alt="userImage" />
                                </div>
                            </div>
                            <div className="hstack gap-1">
                                <div>
                                    <img height="60px" width="60px" className="rounded-circle "
                                        src="/defaultImg/profile.jpg"
                                        alt="userImage" />
                                </div>
                                <div><p className="m-0">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem, asperiores?</p></div>
                            </div>
                            <div className="hstack gap-1 ps-5">
                                <div className="text-end ms-auto">
                                    <p className="m-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro obcaecati reprehenderit atque ullam deleniti saepe ex fugit sunt perspiciatis dolores!</p>
                                </div>
                                <div>
                                    <img height="60px" width="60px" className="rounded-circle "
                                        src="/defaultImg/profile.jpg"
                                        alt="userImage" />
                                </div>
                            </div>
                        </div>
                        <div clasNames="card-footer">
                            <div className="input-group input-group-lg mb-2">
                                <input type="text" className="form-control" placeholder="Send a message" />
                                <button className="btn btn-success px-4">
                                    Send
                                </button>
                            </div>

                        </div>
                    </div>
                </main>
            </div>
        </div >
    )
}

export default ChatContainer;