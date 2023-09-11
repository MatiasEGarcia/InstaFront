import { NOTIFICATION_SEVERITIES } from "../Util/UtilTexts";
import NotificationToast from "../Components/NotificationToast";
import { createContext, useState } from 'react';

const NotificationContext = createContext();

export function NotificationProvider({children}){
    const [msgConfig, setMsgConfig] =  useState({
        severity: NOTIFICATION_SEVERITIES[0],
        message:'',
    });

    /**
     * Function to set notification.
     * 
     * @param {NOTIFICATION_SEVERITIES} props.sev - Type of message,success,error,etc.
     * @param {String} props.msg - Notification content.
     * @param {Number} props.timeout - Notification time of existence. no required.(default 5).
     * @returns {JSX.Element} - NotificationContext provider
     */
    function setNotification({sev,msg,timeout = 5}){
        setMsgConfig({severity:sev, message:msg})

        setTimeout(() => {
            setMsgConfig({...msgConfig,message:''});
        },timeout * 1000);
    }

    return(
        <NotificationProvider value={setNotification}>
            <NotificationToast message={msgConfig.message} severity={msgConfig.severity}/>
            {children}
        </NotificationProvider>
    )
}

export default NotificationContext;