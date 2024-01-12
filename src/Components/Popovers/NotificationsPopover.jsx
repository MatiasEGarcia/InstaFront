import { Trash } from "react-bootstrap-icons";
import { deleteAllPersonalNotifications } from "../../Service/NotificationService";
import { NOTIFICATION_SEVERITIES } from "../../Util/UtilTexts";
import { useNotification } from "../../hooks/useNotification";
import NotificationCard from "../NotificationCard";

/**
 * Component that returns notifications popover to use in some navigation.
 * @param {Object} param - The component props.
 * @param {Function} param.hidePopover - function to close popover
 * @param {String} param.container - type of container , for bottom navigation or left navigation
 * @returns {JSX.Element} - notifications popover.
 */
function NotificationsPopover({ hidePopover, container }) {
    const { notificationList,
        setNotificationList,
        setNotificationToast } = useNotification();

    //funciton to delete all personal notifications
    function deleteAllNotifications() {
        deleteAllPersonalNotifications().then(data => {
            setNotificationList([]); //quit all notifications
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[0],
                msg: data.body.message
            });
        }).catch(() => {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[1],
                msg: data.message
            });
        });
    }


    return (
        <div className={`${container} border rounded p-1 gy-2 bg-secondary-subtle`} onMouseLeave={() => hidePopover()}>
            <div className="text-center">
                <h4 >
                    Notifications
                </h4>
                <span>
                    <Trash className="cursor-pointer-hover" onClick={deleteAllNotifications} size={30} color="red" />
                </span>
            </div>
            <div className="h-80 overflow-auto">
                <div className="vstack gap-3 mt-3">
                    {notificationList.length === 0
                        ? <div className="w-100 text-center"><p>There is no notifications</p></div>
                        : notificationList.map((notif) => {
                            return (
                                <NotificationCard key={notif.notiId}
                                    notifId={notif.notiId}
                                    notifType={notif.notificationType} 
                                    elementId={notif.elementId} 
                                    notifMessage={notif.notiMessage}
                                    notifCreatedAt={notif.createdAt}
                                    fromWhoId={notif.fromWho.userId}
                                    toWhoId={notif.toWho.userId}
                                    fromWhoImage={notif.fromWho.image}
                                    fromWhoUsername={notif.fromWho.username}
                                />
                            )
                        })}
                </div>
            </div>
        </div>
    )
}

export default NotificationsPopover;