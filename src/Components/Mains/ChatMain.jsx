import { InfoCircle } from "react-bootstrap-icons"

export default function ChatMain() {
    return (
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
                <div className="card-footer">
                    <div className="input-group input-group-lg mb-2">
                        <input type="text" className="form-control" placeholder="Send a message" />
                        <button className="btn btn-success px-4">
                            Send
                        </button>
                    </div>

                </div>
            </div>
        </main>
    )
}