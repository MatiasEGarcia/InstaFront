import { DIR_ASC_DIRECTION } from "../Util/UtilTexts";
import { USERS_ENDPOINT } from "../Util/endpoints";
import fetchApi from "./FetchServices";

/**
 * Function to save web socket token for connection in local storage 
 * @param {String} webSocketAuthToken - web socket token
 */
function setWebSocketToken(webSocketAuthToken){
    localStorage.setItem('webSocketToken', webSocketAuthToken);
}


/**
 * Async function to Log out the user by sending a request to the server with
 * the authentication token and refresh token.
 * @returns {Promise<Object>} data object with the body of the response.
 */
export async function logout() {
    let data;
    const token = localStorage.getItem('authToken');
    const refreshToken = localStorage.getItem('authRefreshToken');
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, refreshToken }),
    }
    data = await fetchApi({
        endpoint: `${USERS_ENDPOINT}/logout`,
        options
    })
    return data;
}

/**
 * Async function to upload or change user profile image.
 * 
 * @param {File} img new user profile image.
 * @returns {Promise<Object>} data object with the body of the response
 */
export async function uploadProfileImage(img) {
    if (!img instanceof File) {
        throw new Error('img is not a file');
    }
    let data;
    const formData = new FormData();
    formData.append('img', img);
    const options = {
        method: 'POST',
        headers: {
            /*Why don't I add the Content-type header? I need the browser to create it automatically,
             and the add the boundary too,  If I add the Content-type manually,the boundary will 
             not be set and the request won't work */
        },//I need this even empty for fetchApi function
        body: formData,
    }

    data = await fetchApi({
        endpoint: `${USERS_ENDPOINT}/image`,
        options
    })
    return data;
}

/**
 * Function to change user visiblity(from private to public and vice versa).
 * 
 * @returns {Promise<Object>} data object with the body of the response.
 */
export async function changeUserVisibility() {
    let data;
    const options = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
        },
    }
    data = await fetchApi({
        endpoint: `${USERS_ENDPOINT}/visible`,
        options
    })
    return data;
}

/**
 * Just search auth user profile image,username and if is visible.
  * @returns {Promise<Object>} data object with the body of the response.
 */
export async function getBasicUserInfo() {
    let data;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }
    data = await fetchApi({
        endpoint: `${USERS_ENDPOINT}/userBasicInfo`,
        options
    });
    return data;
}

/**
 * 
 * @param {String} id  id of the user wanted.
 * @returns {Promise<Object>} data object with the body of the response.
 */
export async function getGeneralUserInfo(id) {
    let data;
    const options = {
        method: 'GET',
        headers: {}
    }

    data = await fetchApi({
        endpoint: `${USERS_ENDPOINT}/generalInfoById/${id}`,
        options
    });

    return data;
}


/**
 * Async function to get Personal details of the user.
 * @returns {Promise<Object} data object with the body of the response or headers if there is not personal details.
 */
export async function getPersonalDetails() {
    let data;
    const options = {
        method: 'GET',
        headers: {}//I need this even empty for fetchApi function
    }
    data = await fetchApi({
        endpoint: `${USERS_ENDPOINT}/personalDetails`,
        options
    })
    return data;
}

/**
 * Async function to save Personal details of the user.
 * @param {Object} param0 The function param.
 * @param {String} param0.name personal detail name.
 * @param {String} param0.lastname personal detail lastname.
 * @param {String} param0.age personal detail age.
 * @param {String} param0.email personal detail email.
 * @returns {Promise<Object>} data object with the body of the response.
 */
export async function savePersonalDetails({ name, lastname, age, email }) {
    let data;
    const bodyRequest = {
        name,
        lastname,
        age,
        email
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyRequest),
    }
    data = await fetchApi({
        endpoint: `${USERS_ENDPOINT}/personalDetails`,
        options
    })
    return data;
}


/**
 * Async function to search users by only one condition.
 * @param {String} param0.column column in which to apply conditions.
 * @param {String} param0.value value to compare
 * @param {String} param0.page page number in case of pagination.
 * @param {String} param0.pageSize page size in case of pagination.
 * @param {String} param0.sortDir sort direction(ASC, DESC).
 * @param {String} param0.operation Type of operation(equal, like,etc)
 * @returns {Promise<Object>} Data object with users.
 */
export async function searchUsersByOneCondition({
    column, value, page, pageSize, sortDir, operation
}) {
    let data;
    const params = new URLSearchParams({
        page: page || '0',
        pageSize: pageSize || '20',
        sortField: 'username',
        sortDir: sortDir || DIR_ASC_DIRECTION,
    });
    const bodyRequest = {
        column,
        value,
        dateValue: false,
        operation
    };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyRequest),
    }

    data = await fetchApi({
        endpoint: `${USERS_ENDPOINT}/searchAll/oneCondition?` + params.toString(),
        options
    })
    return data;


}

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
        endpoint: `${USERS_ENDPOINT}/notifications?${params.toString()}`,
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
        endpoint: `${USERS_ENDPOINT}/deleteNotification/${notiId}`,
        options
    })
    return data;
}


/**
 * Function to get web socket token and save it in local storage.
 */
export async function getWebSocketToken() {
    let data;
    const options = {
        method: 'GET',
        headers: {}//I need this even empty for fetchApi function
    }
    data = await fetchApi({
        endpoint: `${USERS_ENDPOINT}/webSocketToken`,
        options
    })
    setWebSocketToken(data.body.webSocketAuthToken);
}
