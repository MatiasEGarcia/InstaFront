import { Exclamation, Trash } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useNotification } from "../../hooks/useNotification";
import UserImageProfile from "../UserImageProfile";

/**
 * Component that returns notifications popover to use in some navigation.
 * @param {Object} param - The component props.
 * @param {Function} param.hidePopover - function to close popover
 * @param {String} param.container - type of container , for bottom navigation or left navigation
 * @returns {JSX.Element} - notifications popover.
 */
function NotificationsPopover({ hidePopover, container }) {
    const { notificationList, deleteNotificationById } = useNotification();

    /**
     * Function to convert notification creation time from utc to local date. 
     * 
     * @param {String} date - date when the notification was created 
     * @returns string local creation date of the notification.
     */
    function localDate(date) {
        const utcLocalCreateAt = new Date(date);
        const options = {
            month: "numeric",
            day: "numeric",
            year: "numeric"
        }
        const localCreatedAt = utcLocalCreateAt.toLocaleDateString(undefined, options);
        return localCreatedAt;
    }

    return (
        <div className={`${container} border rounded p-1 gy-2 bg-secondary-subtle`} onMouseLeave={() => hidePopover()}>
            <div className="text-center"><h4>Notifications</h4></div>
            <div className="h-80 overflow-auto">
                <div className="vstack gap-3 mt-3">
                    {notificationList.length === 0
                        ? <div className="w-100 text-center"><p>There is no notifications</p></div>
                        : notificationList.map((notif) => {
                            return (
                                <div key={notif.notiId} className="position-relative w-95">
                                    <span className="badge bg-warning rounded-pill
                                       position-absolute top-0 start-50 translate-middle">
                                        <Exclamation size={18} className="m-0" />
                                    </span>
                                    <Link to={`/userHome/${notif.fromWho.userId}`} className="btn btn-light p-0 ps-1 pt-1 px-1 
                                            d-flex rounded w-100 me-2">
                                        <div className="d-flex align-items-center">
                                            <UserImageProfile img={notif.fromWho.image} imgWith="60px" imgHeight="60px" />
                                        </div>
                                        <div className="ms-1 ps-1 border-start">
                                            <div className="text-start m-0">
                                                <small style={{ fontSize: "15px" }}>From: {notif.fromWho.username}</small>
                                            </div>
                                            <div>
                                                <small style={{ fontSize: "13px" }}>{notif.notiMessage}</small>
                                            </div>
                                            <div className="text-end">
                                                <small style={{ fontSize: "10px" }}>{localDate(notif.createdAt)}</small>
                                            </div>
                                        </div>
                                    </Link>
                                    <span className="badge bg-danger rounded-pill
                                       position-absolute top-50 start-100 translate-middle
                                       cursor-pointer-hover"
                                        onClick={() => deleteNotificationById(notif.notiId)}
                                    ><Trash size={15} /></span>
                                </div>
                            )
                        })}
                </div>
            </div>
        </div>
    )
}

export default NotificationsPopover;