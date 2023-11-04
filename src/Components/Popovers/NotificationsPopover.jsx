import { Trash, Eye, Envelope, Heart, Pencil, Image, Key } from "react-bootstrap-icons";


//MOFICAR EL COMMENTTT
/**
 * Component that returns notifications popover to use in some navigation.
 * @param {Object} param - The component props.
 * @param {Function} param.hidePopover - function to close popover
 * @param {String} param.container - type of container , for bottom navigation or left navigation
 * @returns {JSX.Element} - notifications popover.
 */
function NotificationsPopover({ hidePopover, container, notificationList }) {
    return (
        <div className={`${container} border rounded p-2 gy-2 bg-secondary-subtle`} onMouseLeave={() => hidePopover()}>
            <div className="text-center"><h4>Notifications</h4></div>
            <hr />
            <div className="vstack gap-2 h-80 overflow-auto">
                <div className="d-flex">
                    <div className="btn btn-light ps-1 d-flex rounded w-100 me-2">
                        <div className="d-flex align-items-center">
                            <Eye size={30} />{/*ACA TENDRIA QUE PONER LA IMAGEN DEL USUARIO QUE HIZO LA ACCION, PARA REFERENCIA, EN VEZ DE UN ICONO*/ }
                        </div>
                        <div className="ms-1 ps-1 border-start">
                            <small>Aca iria el contenido de la noti</small>{/*TENGO QUE HACER LA CONEXION WEBSOCKET */}
                        </div>
                    </div>
                    <button className="btn btn-danger">
                        <Trash size={30} color="black" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NotificationsPopover;