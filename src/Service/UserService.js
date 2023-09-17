import { RefreshTokenException } from "../Errors/Errors";
import { DIR_ASC_DIRECTION, MESS_AUTH_TOKEN_EXPIRED, MESS_ERROR_SERVER_CONNECTION, MESS_TOKENS_INVALID } from "../Util/UtilTexts";
import { USERS_ENDPOINT } from "../Util/endpoints";
import { refreshToken } from "./AuthService";

/**
 * Logs out the user by sending a request to the server with the authentication token and refresh token.
 * @returns {Promise} A promise that resolves with the response data if the logout is successful.
 */
export async function logout(){
    let res;
    const token = localStorage.getItem('authToken');
    const refreshToken = localStorage.getItem('authRefreshToken');

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({token, refreshToken}),
    }

    try {
        res = await fetch(`${USERS_ENDPOINT}/logout`,options);
    } catch (error) {
        console.error(`Error trying to connect to server -> ${error}`);
        throw new Error(MESS_ERROR_SERVER_CONNECTION);
    }

    if(res.status >= 200 & res.status <= 299){
        const data = await res.json();
        return data;
    }else if(res.status === 401){//means that that the auth token is invalid and user needs to auth again with refreshToken.
        console.warn(MESS_AUTH_TOKEN_EXPIRED);
        if(!isTokenRefreshed){//to avoid circle loop
            isTokenRefreshed = true;
            await refreshToken();
            // Call the function again, now that the token has been refreshed
            return logout();
        }else{
            throw new RefreshTokenException(MESS_TOKENS_INVALID);
        }
    }else{
        const errorData = await res.json();
        console.warn(res.status);
        throw new Error(`There was a error: ${errorData.message}`)
    }
}

/**
 * Just search user profile image,username and if is visible.
  * @returns {Promise} A promise that resolves with the response data if the request is successful.
 */
export async function getBasicUserInfo(){
    let isTokenRefreshed = false;
    let res;
    const options={
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
    }

    try {
        res = await fetch(`${USERS_ENDPOINT}/userBasicInfo`,options);
    } catch (error) {
        console.error(`Error trying to connect to server -> ${error}`);
        throw new Error(MESS_ERROR_SERVER_CONNECTION);  
    }

    if(res.status >= 200 && res.status <= 299){
        const data = await res.json();
        return data;
    }else if(res.status === 401){//means that that the auth token is invalid and user needs to auth again with refreshToken.
        console.warn(MESS_AUTH_TOKEN_EXPIRED);
        if(!isTokenRefreshed){//to avoid circle loop
            isTokenRefreshed = true;
            await refreshToken();
            // Call the function again, now that the token has been refreshed
            return getBasicUserInfo();
        }else{
            throw new RefreshTokenException(MESS_TOKENS_INVALID);
        }
    }else{
        const errorData = await res.json();
        console.warn(res.status);
        throw new Error(errorData.message);
    }
}

export async function searchUsersByOneCondition({
    column, value, page, pageSize, sortDir, operation
}){
    let isTokenRefreshed = false;
    let res;
    const params = new URLSearchParams({
        page : page || '0',
        pageSize: pageSize || '20',
        sortField: 'userId',
        sortDir:sortDir || DIR_ASC_DIRECTION,
    });
    const bodyRequest = {
        column,
        value,
        dateValue: false,
        operation
    };
    const options = {
        method : 'POST',
        headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(bodyRequest),
    }

    try {
        res = await fetch(`${USERS_ENDPOINT}/searchAll/oneCondition?` + params.toString(),options);
    } catch (error) {
        console.error(`Error trying to connect to server -> ${error}`);
        throw new Error(`${MESS_ERROR_SERVER_CONNECTION}`)
    }

    if(res.status >= 200 && res.status <= 299){
        const data = await res.json();
        return data;
    }else if(res.status === 401){//means that that the auth token is invalid and user needs to auth again with refreshToken.
        console.warn(MESS_AUTH_TOKEN_EXPIRED);
        if(!isTokenRefreshed){//to avoid circle loop
            isTokenRefreshed = true;
            await refreshToken();
            // Call the function again, now that the token has been refreshed
            return searchUsersByOneCondition(column, value, page, pageSize, sortDir, operation);
        }else{
            throw new Error(MESS_TOKENS_INVALID);
        }
    }else{
        const errorData = await res.json();
        console.warn(res.status);
        throw new Error(errorData.message);
    }

}