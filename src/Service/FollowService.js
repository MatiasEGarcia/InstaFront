import { DIR_ASC_DIRECTION, EQUAL, FOLLOWED_STATUS, GLOBAL_OPERATORS, NOT_EQUAL } from "../Util/UtilTexts";
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


/**
 * Aync function to get all follow requests that are not yet authorized by the authenticating user
 * @param {String} param.page  page number in case of pagination.
 * @param {String} param.pageSize  page size in case of pagination.
 * @param {String} param.sortDirt  sort direction(ASC, DESC)
 * @param {String} param.authUserId id of the user authenticated.
 * @returns {Promise<Object>} Data object with users. (can be empty, 
 * in that case return an header with info about why is empty)
 */
export async function findUsersThatWantToFollowYou({
    page,pageSize, sortDir, authUserId
}){
    let data;
    const params = new URLSearchParams({
        page: page || '0',
        pageSize: pageSize || '10',
        sortField: 'followId',
        sortDir: sortDir || DIR_ASC_DIRECTION
    })

    const followedEqualAuthUserCondition = {
        column: 'userId',
        value: authUserId,
        dateValue:false,
        joinTable: 'followed',
        operation: EQUAL
    };
    const followStatusNotEqualAccepted = {
        column: 'followStatus',
        value: FOLLOWED_STATUS[0],
        dateValue: false,
        operation: NOT_EQUAL
    };

    const generalSearch = {
        reqSearchs: [followedEqualAuthUserCondition,followStatusNotEqualAccepted],
        globalOperator : GLOBAL_OPERATORS[0]
    }

    const options = {
        method : 'POST',
        headers : {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(generalSearch)
    }

    data = await fetchApi({
        endpoint: `${FOLLOW_ENDPOINT}/findAllBy?${params.toString()}`,
        options
    })

    return data;
}

/**
 * Async function to get all follow requests where the auth user is not authorized to follow yet.
 * @param {String} param.page  page number in case of pagination.
 * @param {String} param.pageSize  page size in case of pagination.
 * @param {String} param.sortDirt  sort direction(ASC, DESC)
 * @param {String} param.authUserId id of the user authenticated.
 * @returns {Promise<Object>} Data object with users. (can be empty, 
 * in that case return an header with info about why is empty)
 */
export async function usersYouWantFollowButIsNotAllowedYet({
    page,pageSize, sortDir, authUserId
}){
    let data;
    const params = new URLSearchParams({
        page: page || '0',
        pageSize: pageSize || '10',
        sortField: 'followId',
        sortDir: sortDir || DIR_ASC_DIRECTION
    })

    const followerEqualAuthUserCondition = {
        column: 'userId',
        value: authUserId,
        dateValue:false,
        joinTable: 'follower',
        operation: EQUAL
    };
    const followStatusNotEqualAccepted = {
        column: 'followStatus',
        value: FOLLOWED_STATUS[0],
        dateValue: false,
        operation: NOT_EQUAL
    };

    const generalSearch = {
        reqSearchs: [followerEqualAuthUserCondition,followStatusNotEqualAccepted],
        globalOperator : GLOBAL_OPERATORS[0]
    }

    const options = {
        method : 'POST',
        headers : {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(generalSearch)
    }

    data = await fetchApi({
        endpoint: `${FOLLOW_ENDPOINT}/findAllBy?${params.toString()}`,
        options
    })

    return data;
}