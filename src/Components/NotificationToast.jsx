import { NOTIFICATION_SEVERITIES, NOTIFICATION_TYPE } from "../Util/UtilTexts";
import { Eye, Envelope, Heart, Pencil, Image, EmojiNeutral, Key } from "react-bootstrap-icons";

/**
 * Compoment that will contain the render of notification toast that the user should see.
 * @param {string} props.message - message user should see.
 * @param {string} props.severity - can be success or error, it depends on the situation. Will change the appearance of the notification.
 * @param {string} props.notificationType - error, follow, type of the notification, to set notification image
 * @returns {JSX.Element} - The rendered Notification component.
 */
function NotificationToast({ message, severity, notificationType }) {
    let bgSeverityColor; //background color, will change depending the severity

    //I don't know how many type of severities I will have so I use switch, if only are 2 , maybe I'll use conditional in the classname
    switch (severity) {
        case NOTIFICATION_SEVERITIES[0]:
            bgSeverityColor = 'bg-success';
            break;
        case NOTIFICATION_SEVERITIES[1]:
            bgSeverityColor = 'bg-danger';
            break;
        case NOTIFICATION_SEVERITIES[2]:
            bgSeverityColor = 'bg-info-subtle';
            break;
    }

    if (message === '') return

    return (
        <div className="position-fixed top-0 end-0 z-3 w-50 w-md-25">
            <div className="card">
                <div className={`card-header p-1 ps-2 ${bgSeverityColor} bg-opacity-75 d-flex`}>
                    {notificationType === NOTIFICATION_TYPE[0] && <Eye size={30} />}
                    {notificationType === NOTIFICATION_TYPE[1] && <Envelope size={30} />}
                    {notificationType === NOTIFICATION_TYPE[2] && <Heart size={30} />}
                    {notificationType === NOTIFICATION_TYPE[3] && <Pencil size={30} />}
                    {notificationType === NOTIFICATION_TYPE[4] && <Image size={30} />}
                    {notificationType === NOTIFICATION_TYPE[5] && <EmojiNeutral size={30} />}
                    {notificationType === NOTIFICATION_TYPE[6] && <Key size={30} />}
                    <h3 className="m-0 ms-2">{severity}</h3>
                </div>
                <div className="card-body p-1 ps-2 py-2">
                    {message}
                </div>
            </div>
        </div>
    )
}

export default NotificationToast;