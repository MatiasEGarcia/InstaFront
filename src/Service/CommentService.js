import { DIR_ASC_DIRECTION, REQUIRED_PARAM } from "../Util/UtilTexts";
import { COMMENTS_ENDPOINT } from "../Util/endpoints";
import fetchApi from "./FetchServices";


/**
 * To save a new comment.
 * @param {String} param.body - comment's content. (required)
 * @param {String} param.parentId - comment's parent id.
 * @param {String} param.publImgId - comment's publication (required)
 * @returns {Promise<Object>} Data object with comment created.
 */
export async function save({body, parentId, publImgId}){
    if(!body || !publImgId){
        throw new Error(REQUIRED_PARAM);
    }
    let data;
    const bodyRequest = {
        body,
        parentId,
        publImgId
    }
    const options = {
        method: 'POST',
        headers : {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(bodyRequest)
    }
    data = await fetchApi({
        endpoint : `${COMMENTS_ENDPOINT}`,
        options
    })

    return data;
}

/**
 * Get comments by publication id.
 * @param {String} param.publicationId  publication's id. (required)
 * @param {String} param.pageNo page number in case of pagination.
 * @param {String} param.pageSize page size in case of pagination.
 * @param {String} param.sortDir sort direction(ASC, DESC).
 * @param {String} param.sortField field which apply sort.
 * @returns {Promise<Object>} Data object with list of comments and pagination info.
 * @throws Error if there were some required param not gived.
 */
export async function getByPublcationId({
    publicationId ,pageNo, pageSize, sortDir, sortField
}){
    if(!publicationId) {
        throw new Error(REQUIRED_PARAM);
    }
    let data;
    const params = new URLSearchParams({
        publicationId,
        page: pageNo || '0',
        pageSize: pageSize || '20',
        sortDir: sortDir || DIR_ASC_DIRECTION,
        sortField: sortField ||'commentId'
    });
    const options = {
        method : 'GET',
        headers :{}
    }

    data = await fetchApi({
        endpoint : `${COMMENTS_ENDPOINT}/manyByPublicationId?${params.toString()}`,
        options
    })
    return data;
}

/**
 * Get comments by parent's id.
 * @param {String} param.parentId  parent comment's id. (required)
 * @param {String} param.page page number in case of pagination.
 * @param {String} param.pageSize page size in case of pagination.
 * @param {String} param.sortDir sort direction(ASC, DESC).
 * @param {String} param.sortField field which apply sort.
 * @returns {Promise<Object>} Data object with list of comments and pagination info.
 * @throws Error if there were some required param not gived.
 */
export async function getByParentId({
    parentId ,pageNo, pageSize, sortDir, sortField
}){
    if(!parentId) throw new Error(REQUIRED_PARAM);
    let data;
    const params = new URLSearchParams({
        parentId,
        page: pageNo || '0',
        pageSize: pageSize || '20',
        sortDir: sortDir || DIR_ASC_DIRECTION,
        sortField: sortField ||'commentId'
    });
    const options = {
        method : 'GET',
        headers :{}
    }

    data = await fetchApi({
        endpoint : `${COMMENTS_ENDPOINT}/manyByParentId?${params.toString()}`,
        options
    })
    return data;
}

/**
 * Delete a comment by id.
 * @param {String} commentId comment's id. (required)
 * @returns {Promise<Object>} data object with a confirmation message.
 * @throws Error if some required param was not gived.
 */
export async function deleteById(commentId){
    if(!commentId) throw new Error(REQUIRED_PARAM);
    let data;
    const options = {
        method: 'DELETE',
        headers : {}
    }
    data = await fetchApi({
        endpoint : `${COMMENTS_ENDPOINT}/byId/${commentId}`,
        options
    });

    return data;
}

/**
 * Update a comment by id.
 * @param {String} param.commentId comment's id. (required)
 * @param {String} param.body comment's new content. (required)
 * @returns {Promise<Object>} data object with the comment updated.
 * @throw Error if there was some required param not gived 
 */
export async function updateById({commentId , body}){
    if(!commentId || !body) throw new Error(REQUIRED_PARAM);
    let data;
    const bodyRequest = {
        commentId,
        body
    };
    const options = {
        method : 'PUT',
        headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyRequest)
    };
    data = await fetchApi({
        endpoint : `${COMMENTS_ENDPOINT}/byId`,
        options
    });

    return data;
}

