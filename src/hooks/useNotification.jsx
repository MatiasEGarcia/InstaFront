import { NotificationContext } from "../Context/NotificationContext";
import { useContext } from "react";

/**
 * useHook to get the NotificationContext
 */
export const useNotification = () => {
    return useContext(NotificationContext);
}