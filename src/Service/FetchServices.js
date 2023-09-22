import { refreshToken } from "./AuthService";
import { MESS_TOKENS_INVALID, MESS_ERROR_SERVER_CONNECTION, MESS_AUTH_TOKEN_EXPIRED } from "../Util/UtilTexts";

/**
 * Async Fetch function to do a request to the server.
 * 
 * @param {Object} param - The function param.
 * @param {String} param.endpoint - endpoint to the resource, can contain params.
 * @param {String} param.options - fetch options.
 * @returns {Promise<Object>} - if the response status === 204 returns response headers, if not response data.
 * @throws {Error} - if authentication tokens are invalid or if there was some error in the connection or request.
 */
export default async function fetchApi({endpoint, options}){
	let isTokenRefreshed = false;
    let res;

	try {
        res = await fetch(endpoint, options);
    } catch (error) {
        console.error(`Error trying to connect to server -> ${error}`);
        throw new Error(`${MESS_ERROR_SERVER_CONNECTION}`)
    }

	if (res.status === 204) { //if is 204, no resources was found
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
            return fetchApi({endpoint, options});
        } else {
            throw new Error(MESS_TOKENS_INVALID);
        }
    } else {
        const errorData = await res.json();
        console.warn(res.status);
        throw new Error(errorData.message);
    }
}

