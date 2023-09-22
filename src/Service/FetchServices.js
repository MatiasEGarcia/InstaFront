import { refreshToken } from "./AuthService";
import { MESS_TOKENS_INVALID, MESS_ERROR_SERVER_CONNECTION, MESS_AUTH_TOKEN_EXPIRED } from "../Util/UtilTexts";

/**
 * Async Fetch function to do a request to the server.
 * @param {String} param.endpoint - endpoint to the resource, can contain params.
 * @param {String} param.options - fetch options.
 * @returns {Promise<Object>} data object with the body or headers of the response.
 * @throws {Error} if authentication tokens are invalid or if there was some error in the connection or request.
 */
export default async function fetchApi({endpoint, options}){
	let isTokenRefreshed = false;
    let fetchRes;//request fetch response
    let data = {};//function return object

	try {
        fetchRes = await fetch(endpoint, options);
    } catch (error) {
        console.error(`Error trying to connect to server -> ${error}`);
        throw new Error(`${MESS_ERROR_SERVER_CONNECTION}`)
    }

	if (fetchRes.status === 204) { //if is 204, no resources was found
        data.headers = fetchRes.headers; //in the headers there is one with info, is called 'moreInfo'
        return data;
    } else if (fetchRes.status >= 200 && fetchRes.status <= 299) {
        data.body = await fetchRes.json();
        return data;
    } else if (fetchRes.status === 401) {//means that that the auth token is invalid and user needs to auth again with refreshToken.
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
        const errorData = await fetchRes.json();
        console.warn(fetchRes.status);
        throw new Error(errorData.message);
    }
}

