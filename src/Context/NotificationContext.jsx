import { NOTIFICATION_SEVERITIES, NOTIFICATION_TYPE } from "../Util/UtilTexts";
import { createContext, useState } from 'react';
import NotificationToast from "../Components/NotificationToast";

export const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [msgConfig, setMsgConfig] = useState({
        severity: NOTIFICATION_SEVERITIES[0],
        message: '',
        type: '', //follow, like , error, etc
    });
    const [notificationList, setNotificationList] = useState([]);

    /**
     * Function to set notification.
     * 
     * @param {NOTIFICATION_SEVERITIES} props.sev - Type of message,success,error,etc.
     * @param {String} props.msg - Notification content.
     * @param {Object} props.fromWho - object that will contain info about who trigger the notification, the server or a user 
     * that wants to follow the currect user as example, default server.
     * @param {NOTIFICATION_TYPE} prop.type - type of the notification, follow, comment,etc.
     * @param {Date} prop.createdAt - from when is the notification, (mostly to have a sort atribute)
     * @param {Number} props.timeout - Notification time of existence. no required.(default 7).
     * @returns {JSX.Element} - NotificationContext provider
     */
    function setNotification({ sev, msg, fromWho = { username: 'server' }, type, createdAt, timeout = 7 }) {
        setMsgConfig({ severity: sev, message: msg, type});

        if (sev == NOTIFICATION_SEVERITIES[2]) {//I only save info notifications.
            const notification = {
                msg,
                type,
                fromWho,
                createdAt
            }
            setNotificationList(...notificationList, notification);
        }

        setTimeout(() => {
            setMsgConfig({ ...msgConfig, message: '' });
        }, timeout * 1000);
    }

    return (
        <NotificationContext.Provider value={{ setNotification, notificationList, setNotificationList }}>
            <NotificationToast message={msgConfig.message}
                severity={msgConfig.severity}
                notificationType={msgConfig.notificationType} />
            {children}
        </NotificationContext.Provider>
    )
}


