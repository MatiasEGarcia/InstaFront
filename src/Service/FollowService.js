import { FOLLOW_ENDPOINT } from "../Util/endpoints";
import fetchApi from "./FetchServices";

/**
 * Async function to follow another user.
 * @param {String} followedId  id of user want to follow.
 * @returns {Promise<Object>} data object with the body of the response.
 */
export async function follow(followedId){
    let data;
    const options = {
        method: 'POST',
        headers: {},
    };
    const params = new URLSearchParams({
        followed : followedId,
    });

    data = await fetchApi({
        endpoint: `${FOLLOW_ENDPOINT}?`+ params.toString(),
        options
    })

    return data;
}

/**
 * Async function to follow another user.
 * @param {String} followedId  id of user want to left to follow.
 * @returns {Promise<Object>} data object with the body of the response.
 */
export async function unFollow(followedId){
    let data;
    const options = {
        method: 'POST',
        headers: {},
    };

    data = await fetchApi({
        endpoint: `${FOLLOW_ENDPOINT}/${followedId}`,
        options
    })

    return data;
}

/**
 * Async function to update follow status.
 * @param {String} followedId  id of user want to left to follow.
 * @returns {Promise<Object>} data object with the body of the response.
 */
export async function updateFollowStatus(newFollowStatus){

}