import { MESSAGES_ENDPOINT } from "../Util/endpoints";
import fetchApi from "./FetchServices";

/**
 * Async function to create a message
 * @param {String} param.message - new message
 * @param {String} param.chatId - all message should be in a chat, this is chat's id. 
 * @returns {Promise<Object>} data object with the body of the response.
 */
export async function create({message , chatId}){
    let data;
    const options = {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({message, chatId})
    };

    data = await fetchApi({
        endpoint : `${MESSAGES_ENDPOINT}`,
        options 
    });

    return data;
}

/**
 * Async function to get messages from a specific chat, by chat's id.
 * @param {String} param.chatId - chat's id
 * @param {String} param.page page number in case of pagination.
 * @param {String} param.pagSize page size in case of pagination.
 * @param {String} param.sortDir sort direction(ASC, DESC).
 * @param {String} param.sortField field by sort
 * @returns {Promise<Object>} Data body with chat messages or a header with info.
 */
export async function getAllByChat({
    chatId,pageNo, pageSize, sortDir, sortField
}){
    let data;
    const params = new URLSearchParams({
        page: pageNo,
        pageSize : pageSize,
        sortField : sortField,
        sortDir: sortDir
    });
    const options = {
        method: 'GET',
        headers:{},
    };

    data = await fetchApi({
        endpoint : `${MESSAGES_ENDPOINT}/${chatId}?${params.toString()}`,
        options 
    });

    return data;
}

/**
 * Function to set all messages from a chat as watched by auth user.
 * @param {String} chatId - chat's id
 * @returns {Promise<Object>} data object with the body of the response.(in best case chat object with messagesWatched updated).
 */
export async function setMessagesWatched(chatId){
    let data;
    const options = {
        method: 'PUT',
        headers:{},
    }

    data = await fetchApi({
        endpoint : `${MESSAGES_ENDPOINT}/watchedAll/${chatId}`,
        options
    });
    return data;
}
