import { RefreshTokenException } from "../Errors/Errors";
import { DIR_ASC_DIRECTION, MESS_AUTH_TOKEN_EXPIRED, MESS_ERROR_SERVER_CONNECTION, MESS_TOKENS_INVALID } from "../Util/UtilTexts";
import { USERS_ENDPOINT } from "../Util/endpoints";
import { refreshToken } from "./AuthService";
import fetchApi from "./FetchServices";

/**
 * Async function to Log out the user by sending a request to the server with
 * the authentication token and refresh token.
 * @returns {Promise<Object>} A promise that resolves with the response data if the logout is successful.
 */
export async function logout() {
    let data;
    const token = localStorage.getItem('authToken');
    const refreshToken = localStorage.getItem('authRefreshToken');
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
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
 * @param {File} img - new user profile image.
 * @returns {Promise<Object>} - object Data from the response if is all ok(an object with the new image64).
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
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
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
 * @returns {Promise<Object>} - User data already updated.
 */
export async function changeUserVisibility() {
    let data;
    const options = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
    }
    data = await fetchApi({
        endpoint: `${USERS_ENDPOINT}/visible`,
        options
    })
    return data;
}

/**
 * Just search user profile image,username and if is visible.
  * @returns {Promise<Object>} Data object with user basic info.
 */
export async function getBasicUserInfo() {
    let data;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
    }
    data = await fetchApi({
        endpoint: `${USERS_ENDPOINT}/userBasicInfo`,
        options
    });
    return data;
}

/**
 * Async function to search users by only one condition.
 * 
 * @param {Object} param0 - The function param.
 * @param {String} param0.column - column in which to apply conditions.
 * @param {String} param0.value - value to compare
 * @param {String} param0.page - page number in case of pagination.
 * @param {String} param0.sortDir - sort direction(ASC, DESC).
 * @param {String} param0.operation - Type of operation(equal, like,etc)
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
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(bodyRequest),
    }
    
    data = await fetchApi({
        endpoint: `${USERS_ENDPOINT}/searchAll/oneCondition?` + params.toString(),
        options
    })
    return data;
   

}


