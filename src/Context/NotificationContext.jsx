import { NOTIFICATION_SEVERITIES, NOTIFICATION_TYPE } from "../Util/UtilTexts";
import { createContext, useState } from 'react';
import NotificationToast from "../Components/NotificationToast";
import { deletePersonalNotificationById } from "../Service/NotificationService";

export const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [msgConfig, setMsgConfig] = useState({
        severity: NOTIFICATION_SEVERITIES[0],
        message: '',
        type: '', //follow, like , error, etc
    });
    const [notificationList, setNotificationList] = useState([]);

    /**
     * Function to set notification toast.
     * 
     * @param {NOTIFICATION_SEVERITIES} props.sev - Severity of message,success,error,etc.
     * @param {String} props.msg - Notification content.
     * @param {Number} props.timeout - Notification time of existence. no required.(default 7).
     * @returns {JSX.Element} - NotificationContext provider
     */
    function setNotificationToast({ sev, msg, timeout = 7 }) {
        setMsgConfig({ severity: sev, message: msg});

        setTimeout(() => {
            setMsgConfig({ ...msgConfig, message: '' });
        }, timeout * 1000);
    }

    /**
     * Create a notification and add to the notification popover in navigation var.
     * @param {String} props.id notification id.
     * @param {String} props.notiMessage - notification message (What is the notification about?)
     * @param {Object} props.fromWho - user that produced the action(follow,like,etc) and in consequence 
     * create the notification.
     * @param {NOTIFICATION_TYPE} props.notificationType - type of notification (like theme, follow theme, etc).
     * @param {Date} pros.createdAt - from when is the notification.
     */
    function createNotification({ id, notificationType, notiMessage, fromWho, createdAt}) {
        setNotificationList(prevNotificationList => [...prevNotificationList, {
            id,
            notificationType,
            notiMessage,
            fromWho,
            createdAt
          }]);
    }

    /**
     * Function to delete notification in notification popover list.
     * @param {String} notificationId notification id.
     */
    function deleteNotificationFromNotificationPopover(notificationId){
        setNotificationList(notificationList.filter((notif) => notif.id !== notificationId));
    }


    /**
     * Function to delete notification from server by id.
     * @param {String} notificationId notification id. 
     */
    function deleteNotificationById(notificationId){
        deletePersonalNotificationById(notificationId).then((data) => {
            setNotificationToast({
                sev: NOTIFICATION_SEVERITIES[2],
                msg: data.body.message
            })
            deleteNotificationFromNotificationPopover(notificationId);
        }).catch((error) => {
            setNotificationToast({
                sev:NOTIFICATION_SEVERITIES[1],
                msg:error.message
            });
        })
    }

    return (
        <NotificationContext.Provider value={{ setNotificationToast, 
                                                notificationList, 
                                                setNotificationList, 
                                                createNotification,
                                                deleteNotificationById}}>
            <NotificationToast message={msgConfig.message}
                severity={msgConfig.severity}
                notificationType={msgConfig.notificationType} />
            {children}
        </NotificationContext.Provider>
    )
}


