import { SIGN_UP, MESS_ERROR_SERVER_CONNECTION, SIGN_IN, ACTION_NO_EXIST } from "../Util/UtilTexts";
import { AUTH_ENDPOINT } from "../Util/endpoints";
import { RefreshTokenException } from "../Errors/Errors";

/**
 * Function to set authentication token for requests by the user.
 * @param {string} token
 */
function setToken(token) {
    localStorage.setItem('authToken', token);
}

/**
 * Function to set authentication refresh token for requests by the user when token is expired.
 * @param {string} refreshToken 
 */
function setRefreshToken(refreshToken) {
    localStorage.setItem('authRefreshToken', refreshToken);
}

/**
 * Remove authToken, authRefreshToken and webSocketToken from localStorage, when there is a logout or when tokes expired.
 */
function removeLocalStorageTokens() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authRefreshToken');
    localStorage.removeItem('webSocketToken');
}

/**
 * Async function to Perform user access to the server based on the specified action, username, and password.
 * @param {Object} options - The options for user access.
 * @param {string} options.action - The action to perform (either 'signUp' or 'signIn').
 * @param {string} options.username - The username for the user.
 * @param {string} options.password - The password for the user.
 * @throws {Error} - If the specified action is not supported or if there was some error with the server. 
 */
export async function userAccess({ action, username, password }) {
    switch (action) {
        case SIGN_UP:
            await register({ username, password });
            break;
        case SIGN_IN:
            await authenticate({ username, password });
            break;
        default:
            throw new Error(ACTION_NO_EXIST);
    }
}

/**
 * Async function to register a user to the server
 * @param {Object} userInfo - user information.
 * @param {string} userInfo.username - username of the user. 
 * @param {string} userInfo.password - password of the user.
 * @returns {Promise<void>}
 */
export async function register({ username, password }) {
    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
    }

    await authFetchApi({
        endpoint: `${AUTH_ENDPOINT}/register`,
        options
    })
}

/**
 * Async function to authenticate the user with the server
 * @param {Object} props - The component props.
 * @param {string} props.username - username of the user that wants authenticate.
 * @param {string} props.password - password of the user that wants authenticate.
 * @returns {Promise<void>} 
 */
export async function authenticate({ username, password }) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
    }
    await authFetchApi({
        endpoint: `${AUTH_ENDPOINT}/authenticate`,
        options
    })
}

/**
 * Async function to refresh the authentication token using the refresh token.
 *  @returns {Promise<void>}
 */
export async function refreshToken() {
    const token = localStorage.getItem('authToken');
    const refreshToken = localStorage.getItem('authRefreshToken');

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, refreshToken }),
    }
    await authFetchApi({
        endpoint: `${AUTH_ENDPOINT}/refreshToken`,
        options
    })
}


//I dont move this function to FetchService because is special for the funcions in this place
/**
 * Fetch function to do a authentications request to the server.
 * If the request was good then will update authentications tokens.
 * In the case of a refresh of the tokens, if they were invalid the will delete tokens from the memory
 * 
 * @param {Object} param - The function param.
 * @param {String} param.endpoint - endpoint to the resource, can contain params.
 * @param {String} param.options - fetch options.
 * @returns {Promise<void>} 
 * @throws {Error} - If there was some error in the connection or in the request
 * @throws {RefreshTokenException} - If the response was with 401 status, meaning that the refresh token was invalid
 */
export async function authFetchApi({ endpoint, options }) {
    let res;

    try {
        res = await fetch(endpoint, options);
    } catch (error) {
        console.error(`Error trying to connect to server -> ${error}`);
        throw new Error(MESS_ERROR_SERVER_CONNECTION);
    }

    if (res.status >= 200 && res.status <= 299) {
        const data = await res.json();
        setToken(data.token);
        setRefreshToken(data.refreshToken);
        return;
    } else if (res.status === 401) {//this means that the tokens in the case of refresh were invalid and user needs to auth again
        removeLocalStorageTokens();
        const errorData = await res.json();
        console.warn(res.status);
        throw new RefreshTokenException(errorData.message);
    } else {
        const errorData = await res.json();
        console.warn(res.status);
        throw new Error(errorData.message);
    }
}