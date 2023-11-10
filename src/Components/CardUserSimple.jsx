import UserImageProfile from "./UserImageProfile"
import { Link } from "react-router-dom"

export default function CardUserSimple({ userId, userImage, username }) {
    return (
        <Link to={`/userHome/${userId}`} className="nav-item btn btn-light w-80 d-flex justify-content-between">
            <div>
                <UserImageProfile imgWith="60px"
                    imgHeight="60px"
                    img={userImage} />
                <span className="ps-3 fs-5">{username}</span>
            </div>
        </Link>
    )
}