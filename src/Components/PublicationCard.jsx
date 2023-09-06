import { Heart } from "react-bootstrap-icons";

/**
 * Component to show publication general information.
 * @param {Object} props - The component props.
 * @param {Function} props.showModal - will open a modal that have the publication info + comentaries.
 * @returns {JSX.Element} - The rendered Publication component.
 */
function PublicationCard({ showModal , width }) {
    return (
        <div className={`card ${width}`}>
            <div className="card-header d-flex justify-content-between">
                <p>Username</p>
                <p>11-12-22</p>
            </div>
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <p className="card-title fs-3 pt-3">Card Title</p>
                    <button className="btn fs-2">
                        <Heart />
                    </button>
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