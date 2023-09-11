import { SIGN_UP, MESS_ERROR_SERVER_CONNECTION, SIGN_IN, ACTION_NO_EXIST } from "../Util/UtilTexts";
import { AUTH_ENDPOINT } from "../Util/endpoints";
import { RefreshTokenException } from "../Errors/Errors";

/**
 * Function to set authentication token for requests by the user.
 * @param {string} token
 */
function setToken(token){
    localStorage.setItem('authToken', token);
}

/**
 * Function to set authentication refresh token for requests by the user when token is expired.
 * @param {string} refreshToken 
 */
function setRefreshToken(refreshToken){
    localStorage.setItem('authRefreshToken',refreshToken);
}

/**
 * Remove authToken and authRefreshToken from localStorage, when there is a logout or when tokes expired.
 */
function removeLocalStorageTokens(){
    localStorage.removeItem('authToken');
    localStorage.removeItem('authRefreshToken');
}

export async function userAccess({action, username, password}){
    switch(action){
        case SIGN_UP:
            await register({username,password});
        case SIGN_IN:
            await authenticate({username, password});
        default:
            throw new Error(ACTION_NO_EXIST);
    }
}

/**
 * Async function to register a user by a Post request to the server.
 * @param {Object} userInfo - user information.
 * @param {string} userInfo.username - username of the user. 
 * @param {string} userInfo.password - password of the user.
 * @returns {Promise} - A promise that resolves when the user is registered.
 * @throws {Error} - If there was an error during registration.
 */
export async function register({username, password}){
    let res;
    const options = {
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password}),
    }

    try {
        res = await fetch(`${AUTH_ENDPOINT}/register`,options);
    } catch (error) {
        console.error(`Error trying to connect to server -> ${error}`);
        throw new Error(MESS_ERROR_SERVER_CONNECTION);
    }

    if(res.status >= 200 && res.status <= 299){
        const data = await res.json();
        setToken(data.token);
        setRefreshToken(data.refreshToken);
        return;
    }else{
        const errorData = await res.json();
        console.warn(res.status);
        throw new Error(`There was a error: ${errorData.message}`);
    }
}

/**
 * If the user exists already, then can authenticate in the server with this function.
 * @param {Object} props - The component props.
 * @param {string} props.username - username of the user that wants authenticate.
 * @param {string} props.password - password of the user that wants authenticate.
 * @returns {Promise} - A promise that resolves when the user is authenticated.
 * @throws {Error} - If there was an error during authentication.
 */
export async function authenticate({username, password}){
    let res;
    const options = {
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password}),
    }

    try {
        res = await fetch(`${AUTH_ENDPOINT}/authenticate`,options);
    } catch (error) {
        console.error( `Error trying to connect to server -> ${error}`);
        throw new Error(MESS_ERROR_SERVER_CONNECTION);
    }

    if(res.status >= 200 && res.status <= 299){
        const data = await res.json();
        setToken(data.token);
        setRefreshToken(data.refreshToken);
    }else{
        const errorData = await res.json();
        console.warn(res.status);
        throw new Error(`There was a error: ${errorData.message}`); 
    }
}

/**
 * Refreshes the authentication token using the refresh token.
 * @returns {Promise<void>} A promise that resolves when the token is refreshed.
 * @throws {Error} If there is an error connecting to the server.
 * @throws {RefreshTokenException} If the tokens are invalid and the user needs to re-authenticate.
 */
export async function refreshToken(){
    let res;
    const token = localStorage.getItem('authToken');
    const refreshToken = localStorage.getItem('authRefreshToken');

    const options = {
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({token, refreshToken}),
    }

    try {
        res = await fetch(`${AUTH_ENDPOINT}/refreshToken`,options)
    } catch (error) {
        console.error(`Error trying to connect to server -> ${error}`);
        throw new Error(MESS_ERROR_SERVER_CONNECTION);
    }

    if(res.status >= 200 && res.status <= 299){
        const data = await res.json();
        setToken(data.token);
        setRefreshToken(data.refreshToken);
        return;
    }else if(res.status === 401){//this means that the tokens were invalid and user needs to auth again
        removeLocalStorageTokens();
        const errorData = await res.json();
        console.warn(res.status);
        throw new RefreshTokenException(errorData.message);
    }
}