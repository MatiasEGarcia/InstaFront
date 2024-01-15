import UserImageProfile from "./UserImageProfile"
import { Link } from "react-router-dom"

/**
 * @param {String} param.id - user's id.
 * @param {String} param.userImage user's image.
 * @param {String} param.username user's username.
 * @param {String} param.size.width profile image width.
 * @param {String} param.size.height profile image height. 
 * @returns 
 */
export default function CardUserSimple({ id, userImage, username, size = {width:"60px" , height : "60px"} }) {
    return (
        <Link to={`/userHome/${id}`} className="nav-item btn btn-light w-80 d-flex justify-content-between">
            <div>
                <UserImageProfile imgWidth={size?.width}
                    imgHeight={size?.height}
                    img={userImage} />
                <span className="ps-3 fs-5">{username}</span>
            </div>
        </Link>
    )
}