import { HeartFill, Heart } from "react-bootstrap-icons";
import UserImageProfile from "./UserImageProfile";
import { Link } from "react-router-dom";

/**
 * Component to show publication general information.
 * @param {Object} props - The component props.
 * @param {Function} props.showModal - will open a modal that have the publication info + comentaries.
 * @param {String} props.width - publication card width.
 * @param {Object} props.item - publication content.
 * @param {Function} props.likePublication - function to like the current publication.
 * @param {Function} props.removeLike - function to remove like from the current publication.
 * @returns {JSX.Element} - The rendered Publication component.
 */
function PublicationCard({ showModal, width, item, likePublication, removeLike }) {
    const utcLocalCreateAt = new Date(item.createdAt);
    const options = {
        month: "numeric",
        day: "numeric",
        year: "numeric"
    }
    const localCreatedAt = utcLocalCreateAt.toLocaleDateString(undefined, options);

    return (
        <div className={`card ${width}`}>
            <div className="card-header d-flex justify-content-between">
                <Link className="btn" to={`/userHome/${item.userOwner.id}`}>
                    <UserImageProfile imgWith="60px" imgHeight="60px" img={item.userOwner.image} />
                    <span className="ps-2 fs-5">{item.userOwner.username}</span>
                </Link>

                <div>
                    {localCreatedAt}
                </div>
            </div>
            <img
                style={{ maxHeight: '200px' }}
                src={`data:image/jpeg;charset=utf-8;base64,${item.image}`}
                className="card-img-top"
                alt="publication image" />
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <p className="card-title fs-3 pt-3">Card Title</p>
                    {item.liked === null && 
                        <Heart size={40}
                               className="cursor-pointer-hover"
                               onClick={() => likePublication(item.id)}
                        />}
                    {item.liked !== null && item.liked === 'true' &&
                         <HeartFill color="red" size={40} 
                                className="cursor-pointer-hover"
                                onClick={() => removeLike(item.id)}
                         />}
                </div>
                <div>
                    <p>{item.description}</p>
                </div>
            </div>
            <div className="card-footer">
                <button type="button" className="btn btn-success" onClick={() => showModal(item.id)}>
                    See comentaries
                </button>
            </div>
        </div>
    )
}

export default PublicationCard;