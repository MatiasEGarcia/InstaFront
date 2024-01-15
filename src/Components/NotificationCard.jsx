import { NOTIFICATION_TYPE } from "../Util/UtilTexts";
import { useNotification } from "../hooks/useNotification";
import { Exclamation, Trash , Envelope} from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import UserImageProfile from "./UserImageProfile";

/**
 * Component to show cards for NotificationPopover component.
 * @param {String} param.id -  notification's id.
 * @param {NOTIFICATION_TYPE} param.notifType - notification's type.
 * @param {String} param.elementId - element's id, for example the publication's id where a comment was written.
 * @param {String} param.notifMessage - notification's message.
 * @param {String} param.notifCreateAt - notification's date of creation.
 * @param {String} param.fromWhoId - id from who send the notificaiton. 
 * @param {String} param.fromWhoImage - profile image from who send the notification.
 * @param {String} param.fromWhoUsername - username from who send the notification.
 * @returns 
 */
export default function NotificationCard({ 
    id, 
    notifType,
    elementId,
    notifMessage, 
    notifCreatedAt, 
    fromWhoId, 
    toWhoId,
    fromWhoImage, 
    fromWhoUsername,
}) {
    const {deleteNotificationById} = useNotification();
    let onclickUrl;

    switch(notifType){
        case NOTIFICATION_TYPE[0] :
            onclickUrl = `/userHome/${fromWhoId}`;
            break;
        case NOTIFICATION_TYPE[1] : 
            onclickUrl = `/chat`;   //The problem with this is that it doesn't send me just to the chat, but to chats in general
            break;
        case NOTIFICATION_TYPE[3] :
            onclickUrl = `/userHome/${toWhoId}/${elementId}`;//necesito el toWho y la publicacion.PARA QUE PUEDA DIRECTO A LA PUBLCIACIONNN
            break;
    }


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
        <div className="position-relative w-95">
            <span className="badge rounded-pill
                                       position-absolute top-0 start-50 translate-middle">
                {notifType === NOTIFICATION_TYPE[0] && <Exclamation size={25} className="m-0 p-0 bg-warning-subtle" color="black"/>}
                {notifType === NOTIFICATION_TYPE[1] && <Envelope size={25} className="m-0 p-0 bg-warning-subtle" color="black"/>}
            </span>
            <Link to={onclickUrl} className="btn btn-light p-0 ps-1 pt-1 px-1 
                                            d-flex rounded w-100 me-2">
                <div className="d-flex align-items-center">
                    <UserImageProfile img={fromWhoImage} imgWith="60px" imgHeight="60px" />
                </div>
                <div className="ms-1 ps-1 border-start">
                    <div className="text-start m-0">
                        <small style={{ fontSize: "15px" }}>From: {fromWhoUsername}</small>
                    </div>
                    <div>
                        <small style={{ fontSize: "13px" }}>{notifMessage}</small>
                    </div>
                    <div className="text-end">
                        <small style={{ fontSize: "10px" }}>{localDate(notifCreatedAt)}</small>
                    </div>
                </div>
            </Link>
            <span className="badge bg-danger rounded-pill
                                       position-absolute top-50 start-100 translate-middle
                                       cursor-pointer-hover"
                onClick={() => deleteNotificationById(id)}
            ><Trash size={15} /></span>
        </div>
    )
}