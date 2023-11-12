import UserImageProfile from "./UserImageProfile"
import { Link } from "react-router-dom"

/**
 * 
 * @param {Object} param.size user image size, by default 60pxx60px 
 * @returns 
 */
export default function CardUserSimple({ userId, userImage, username, size = {width:"60px" , height : "60px"} }) {
    return (
        <Link to={`/userHome/${userId}`} className="nav-item btn btn-light w-80 d-flex justify-content-between">
            <div>
                <UserImageProfile imgWidth={size?.width}
                    imgHeight={size?.height}
                    img={userImage} />
                <span className="ps-3 fs-5">{username}</span>
            </div>
        </Link>
    )
}