import { RefreshTokenException } from "../Errors/Errors";
import { DIR_ASC_DIRECTION, MESS_AUTH_TOKEN_EXPIRED, MESS_ERROR_SERVER_CONNECTION, MESS_TOKENS_INVALID } from "../Util/UtilTexts";
import { USERS_ENDPOINT } from "../Util/endpoints";
import { refreshToken } from "./AuthService";

/**
 * Logs out the user by sending a request to the server with the authentication token and refresh token.
 * @returns {Promise} A promise that resolves with the response data if the logout is successful.
 */
export async function logout() {
    let res;
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

    try {
        res = await fetch(`${USERS_ENDPOINT}/logout`, options);
    } catch (error) {
        console.error(`Error trying to connect to server -> ${error}`);
        throw new Error(MESS_ERROR_SERVER_CONNECTION);
    }

    if (res.status >= 200 & res.status <= 299) {
        const data = await res.json();
        return data;
    } else if (res.status === 401) {//means that that the auth token is invalid and user needs to auth again with refreshToken.
        console.warn(MESS_AUTH_TOKEN_EXPIRED);
        if (!isTokenRefreshed) {//to avoid circle loop
            isTokenRefreshed = true;
            await refreshToken();
            // Call the function again, now that the token has been refreshed
            return logout();
        } else {
            throw new RefreshTokenException(MESS_TOKENS_INVALID);
        }
    } else {
        const errorData = await res.json();
        console.warn(res.status);
        throw new Error(`There was a error: ${errorData.message}`)
    }
}

export async function uploadProfileImage(img) {
    if (!img instanceof File) {
        throw new Error('img is not a file');
    }

    const formData = new FormData();
    formData.append('img', img);
    let isTokenRefreshed = false;
    let res;
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

    try {
        res = await fetch(`${USERS_ENDPOINT}/image`, options);
    } catch (error) {
        console.error(`Error tryin to connect to server -> ${error}`);
        throw new Error(MESS_ERROR_SERVER_CONNECTION);
    }

    if (res.status >= 200 && res.status <= 299) {
        const data = await res.json();
        return data;
    } else if (res.status === 401) {//means that that the auth token is invalid and user needs to auth again with refreshToken.
        console.warn(MESS_AUTH_TOKEN_EXPIRED);
        if (!isTokenRefreshed) {//to avoid circle loop
            isTokenRefreshed = true;
            await refreshToken();
            // Call the function again, now that the token has been refreshed
            return uploadProfileImage(img);
        } else {
            throw new RefreshTokenException(MESS_TOKENS_INVALID);
        }
    } else {
        const errorData = await res.json();
        console.warn(res.status);
        throw new Error(errorData.message);
    }
}

/**
 * Function to change user visiblity(from private to public and vice versa).
 * 
 * @returns {Promise} A promise that resolves with the response data(the user basic info updated).
 * @throws {Error} - If theres was some error in the connection or request.
 */
export async function changeUserVisibility() {
    let isTokenRefreshed = false;
    let res;
    const options = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
    }

    try {
        res = await fetch(`${USERS_ENDPOINT}/visible`, options);
    } catch (error) {
        console.error(`Error trying to connect to server -> ${error}`);
        throw new Error(MESS_ERROR_SERVER_CONNECTION);
    }

    if (res.status >= 200 && res.status <= 299) {
        const data = await res.json();
        return data;
    } else if (res.status === 401) {//means that that the auth token is invalid and user needs to auth again with refreshToken.
        console.warn(MESS_AUTH_TOKEN_EXPIRED);
        if (!isTokenRefreshed) {//to avoid circle loop
            isTokenRefreshed = true;
            await refreshToken();
            // Call the function again, now that the token has been refreshed
            return changeUserVisibility();
        } else {
            throw new RefreshTokenException(MESS_TOKENS_INVALID);
        }
    } else {
        const errorData = await res.json();
        console.warn(res.status);
        throw new Error(errorData.message);
    }
}

/**
 * Just search user profile image,username and if is visible.
  * @returns {Promise} A promise that resolves with the response data if the request is successful.
 */
export async function getBasicUserInfo() {
    let isTokenRefreshed = false;
    let res;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
    }

    try {
        res = await fetch(`${USERS_ENDPOINT}/userBasicInfo`, options);
    } catch (error) {
        console.error(`Error trying to connect to server -> ${error}`);
        throw new Error(MESS_ERROR_SERVER_CONNECTION);
    }

    if (res.status >= 200 && res.status <= 299) {
        const data = await res.json();
        return data;
    } else if (res.status === 401) {//means that that the auth token is invalid and user needs to auth again with refreshToken.
        console.warn(MESS_AUTH_TOKEN_EXPIRED);
        if (!isTokenRefreshed) {//to avoid circle loop
            isTokenRefreshed = true;
            await refreshToken();
            // Call the function again, now that the token has been refreshed
            return getBasicUserInfo();
        } else {
            throw new RefreshTokenException(MESS_TOKENS_INVALID);
        }
    } else {
        const errorData = await res.json();
        console.warn(res.status);
        throw new Error(errorData.message);
    }
}

export async function searchUsersByOneCondition({
    column, value, page, pageSize, sortDir, operation
}) {
    let isTokenRefreshed = false;
    let res;
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

    try {
        res = await fetch(`${USERS_ENDPOINT}/searchAll/oneCondition?` + params.toString(), options);
    } catch (error) {
        console.error(`Error trying to connect to server -> ${error}`);
        throw new Error(`${MESS_ERROR_SERVER_CONNECTION}`)
    }

    if (res.status === 204) { //if is 204, no users were found.
        const headers = res.headers; //in the headers there is one with info, is called 'moreInfo'
        return headers;
    } else if (res.status >= 200 && res.status <= 299) {
        const data = await res.json();
        return data;
    } else if (res.status === 401) {//means that that the auth token is invalid and user needs to auth again with refreshToken.
        console.warn(MESS_AUTH_TOKEN_EXPIRED);
        if (!isTokenRefreshed) {//to avoid circle loop
            isTokenRefreshed = true;
            await refreshToken();
            // Call the function again, now that the token has been refreshed
            return searchUsersByOneCondition(column, value, page, pageSize, sortDir, operation);
        } else {
            throw new Error(MESS_TOKENS_INVALID);
        }
    } else {
        const errorData = await res.json();
        console.warn(res.status);
        throw new Error(errorData.message);
    }

}