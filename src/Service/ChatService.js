import { DIR_ASC_DIRECTION , CHAT_TYPE } from "../Util/UtilTexts";
import { CHAT_ENDPOINT } from "../Util/endpoints";
import fetchApi from "./FetchServices";

/**
 * 
 * Function to get all authUser's chats. 
 * @param {String} param.page page number in case of pagination.
 * @param {String} param.pageSize page size in case of pagination.
 * @param {String} param.sortDir sort direction(ASC, DESC).
 * @returns {Promise<Object>} Data object with a body and inside a list, if there are not, a header with info about. 
 */
export async function getChats({
    pageNo, pageSize, sortDir
}){
    let data;
    const params = new URLSearchParams({
        page: pageNo || '0',
        pageSize: pageSize || '20',
        sortField: 'chatId',
        sortDir: sortDir || DIR_ASC_DIRECTION
    })
    const options = {
        method: 'GET',
        headers: {},
    }

    data = await fetchApi({
        endpoint: `${CHAT_ENDPOINT}?${params.toString()}`,
        options
    });
    return data;
}

/**
 * 
 * @param {String} param.name in case the chat group, this will be it's name.
 * @param {CHAT_TYPE} param.type type of chat. 
 * @param {Array} param.usersToAdd array of users to add in chat.
 * @param {Array} param.usersTOAddAsAdmins array of users to add in chat as admins. auhtUser is not necessary to add. 
 * @returns {Promise<Object>} Data object with the new chat.
 */
export async function create({
    name, type , usersToAdd, usersToAddAsAdmins
}){
    let data;
    const bodyRequest = {
        name,
        type,
        usersToAdd,
        usersToAddAsAdmins
    }
    const options = {
        method : 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(bodyRequest)
    }

    data = await fetchApi({
        endpoint: `${CHAT_ENDPOINT}`,
        options
    });
    return data;
}

/**
 * Function to set a group chat's image.
 * @param {File} param.img chat's image.
 * @param {String} param.chatId chat's id, whithout this we cannot know wich chat update.
 */
export async function setChatGroupImage({img, chatId}){
    if(!img instanceof File){
        throw new Error('img is not a file')
    }
    let data;
    const formData = new FormData();
    formData.append('img', img);
    const options = {
        method : 'POST',
        headers:{},
        body:formData
    }
    data = await fetchApi({
        endpoint: `${CHAT_ENDPOINT}/image/${chatId}`,
        options
    });
    return data;
}