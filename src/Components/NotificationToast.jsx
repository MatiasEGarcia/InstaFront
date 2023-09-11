import { NOTIFICATION_SEVERITIES } from "../Util/UtilTexts";

/**
 * Compoment that will contain the render of notification toast that the user should see.
 * @param {string} props.message - message user should see.
 * @param {string} props.severity - can be success or error, it depends on the situation. Will change the appearance of the notification.
 * @returns {JSX.Element} - The rendered Notification component.
 */
function NotificationToast({ message, severity }) {
    let bgSeverityColor; //background color, will change depending the severity

    //I don't know how many type of severities I will have so I use switch, if only are 2 , maybe I'll use conditional in the classname
    switch (severity) {
        case NOTIFICATION_SEVERITIES[0]:
            bgSeverityColor = 'bg-success';
            break;
        case NOTIFICATION_SEVERITIES[1]:
            bgSeverityColor = 'bg-danger'
            break;
    }

    if (message === '') return

    return (
        <div class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div className={`toast-body ${bgSeverityColor}`}>
                    {message}
                </div>
            </div>
        </div>
    )
}

export default NotificationToast;