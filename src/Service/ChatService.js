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
    pageNo, pageSize
}){
    let data;
    const options = {
        method: 'GET',
        headers: {},
    }

    data = await fetchApi({
        endpoint: `${CHAT_ENDPOINT}/${pageNo}/${pageSize}`,
        options
    });
    return data;
}

/**
 * 
 * @param {String} param.name in case the chat group, this will be it's name.
 * @param {CHAT_TYPE} param.type type of chat. 
 * @param {Array} param.usersToAdd array of users' id to add in chat.
 * @param {Array} param.usersTOAddAsAdmins array of users' id to add in chat as admins. auhtUser is not necessary to add. 
 * @returns {Promise<Object>} Data object with the new chat.
 */
export async function create({
    name, type , usersToAdd, usersToAddAsAdmins
}){
    let data;
    
    const bodyRequest = {
        name,
        type,
        usersToAdd : setUsersAsAdmins({users:usersToAdd, admins: usersToAddAsAdmins})
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
 * @param {String} param.id chat's id, whithout this we cannot know wich chat update.
 */
export async function setChatGroupImage({img, id}){
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
        endpoint: `${CHAT_ENDPOINT}/image/${id}`,
        options
    });
    return data;
}

/**
 * Function to set chat's new name.(only chat type group).
 * 
 * @param {String} param.newName new chat's name.
 * @param {String} param.id  new chat's id. 
 * @returns {Promise<Object>} Data object with the chat info updated.
 */
export async function setChatGroupName({newName,id}){
    let data;
    const options = {
        method: 'PUT',
        headers:{},
    }

    data = await fetchApi({
        endpoint : `${CHAT_ENDPOINT}/name/${newName}/${id}`,
        options
    });

    return data;
}

/**
 * Function to add users.
 * @param {String} param.chatId - chat's id.
 * @param {Array} param.usersToAdd - users' id to add in chat.
 * @param {Array} param.usersToAddAsAdmins - users' id to add in chat as admin. (should be inside of usersToAdd too.) 
 */
export async function addUsers({chatId,usersToAdd, usersToAddAsAdmins}){
    let data;
    const bodyRequest = {
        chatId,
        users: setUsersAsAdmins({users:usersToAdd , admins: usersToAddAsAdmins})
    }

    const options = {
        method: 'POST',
        headers:{
            'Content-type': 'application/json',
        },
        body: JSON.stringify(bodyRequest)
    }

    data = await fetchApi({
        endpoint: `${CHAT_ENDPOINT}/add`,
        options : options
    });

    return data;
}

/**
 * Function to quit users from chat.
 * 
 * @param {String} param.id - chat's id.
 * @param {Array} param.usersToQuit - users' id from users to quit.
 */
export async function quitUsers({id, usersToQuit}){
    let data;
    const bodyRequest = {
        chatId : id,
        usersId: usersToQuit
    }
    const options = {
        method : 'DELETE',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(bodyRequest)
    }

    data = await fetchApi({
        endpoint: `${CHAT_ENDPOINT}/quit`,
        options: options
    });

    return data;
}

/**
 * Function to update user admin status in chat.
 * @param {String} param.chatId - chat's id.
 * @param {String} param.userId - user's id. 
 */
export async function updateAdminStatus({chatId, userId}){
    let data;
    const options = {
        method : 'PUT',
        headers : {},
    }

    data = await fetchApi({
        endpoint : `${CHAT_ENDPOINT}/adminStatus/${chatId}/${userId}`,
        options: options
    })

    return data;
}



/**
 * Function to set wich users will be admins and wich not.
 * 
 * @param {Array} param.users all users' username to add in chat.
 * @param {Array} param.admins all users' username to add as admin in chat. 
 * @returns an array with all the users object to save with a chat.
 */
function setUsersAsAdmins({users , admins}){
    let arrUsersToSave = [];

    users.forEach((userId) =>{
        let userToSave = {
            userId
        };

        admins.includes(userId) ? userToSave.admin = true : userToSave.admin = false;

        arrUsersToSave.push(userToSave);
    });

    return arrUsersToSave;
}