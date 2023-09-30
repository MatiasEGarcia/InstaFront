import { Heart } from "react-bootstrap-icons";
import UserImageProfile from "./UserImageProfile";

/**
 * Component to show publication general information.
 * @param {Object} props - The component props.
 * @param {Function} props.showModal - will open a modal that have the publication info + comentaries.
 * @param {String} props.width - publication card width.
 * @param {Object} props.publication - publication content.
 * @returns {JSX.Element} - The rendered Publication component.
 */
function PublicationCard({ showModal, width, publication }) {
    const utcLocalCreateAt = new Date(publication.createdAt);
    const options = {
        month: "numeric",
        day: "numeric",
        year: "numeric"
    }
    const localCreatedAt = utcLocalCreateAt.toLocaleDateString(undefined, options);

    return (
        <div className={`card ${width}`}>
            <div className="card-header d-flex justify-content-between">
                <div>
                    <UserImageProfile imgWith="60px" imgHeight="60px" img={publication.userOwner.image} />
                    <span className="ps-2 fs-5">{publication.userOwner.username}</span>
                </div>

                <div>
                    {localCreatedAt}
                </div>
            </div>
            <img
                style={{ maxHeight: '200px' }}
                src={`data:image/jpeg;charset=utf-8;base64,${publication.image}`}
                className="card-img-top"
                alt="publication image" />
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <p className="card-title fs-3 pt-3">Card Title</p>
                    <button className="btn fs-2">
                        <Heart />
                    </button>
                </div>
                <div>
                    <p>{publication.description}</p>
                </div>
            </div>
            <div className="card-footer">
                <button type="button" className="btn btn-success" onClick={() => showModal(1)}> {/*aca iria el id de la publicacion*/}
                    See comentaries
                </button>
            </div>
        </div>
    )
}

export default PublicationCard;