import { DIR_ASC_DIRECTION, } from "../Util/UtilTexts";
import { NOTIFICATIONS_ENDPOINT } from "../Util/endpoints";
import fetchApi from "./FetchServices";

/**
 * Async function to get current user's notifications.
 * @param {String} param0.page page number in case of pagination.
 * @param {String} param0.pageSize page size.
 * @param {String} param0.sortField atribute to sort.
 * @param {String} param0.sortDir sort direction(ASC, DESC).
 * @returns {Promise<Object} data object with the body of the response or headers if there is not notifications for the current user.
 */
export async function getPersonalNotifications({
    page, pageSize, sortField, sortDir
}) {
    let data;
    const params = new URLSearchParams({
        page: page || '0',
        pageSize: pageSize || '20',
        sortField: sortField || 'notiId',
        sortDir: sortDir || DIR_ASC_DIRECTION,
    });
    const options = {
        method: 'GET',
        headers: {}
    }
    data = await fetchApi({
        endpoint: `${NOTIFICATIONS_ENDPOINT}/getByAuthUser?${params.toString()}`,
        options
    })
    return data;
}

/**
 * Function to delete notification record by id.
 * 
 * @param {String} notiId notification id. 
 * @returns {Promise<Object} data object with the body of the response.
 */
export async function deletePersonalNotificationById(notiId){
    let data;
    const options = {
        method : 'DELETE',
        headers:{}
    }
    data = await fetchApi({
        endpoint: `${NOTIFICATIONS_ENDPOINT}/${notiId}`,
        options
    })
    return data;
}
