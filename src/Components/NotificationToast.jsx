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
                <div className={`card-header p-1 ps-2 ${bgSeverityColor} bg-opacity-75`}>
                    <h3 className="m-0">{severity}</h3>
                </div>
                <div className="card-body p-1 ps-2 py-2">
                    {message}
                </div>
            </div>
        </div>
    )
}

export default NotificationToast;