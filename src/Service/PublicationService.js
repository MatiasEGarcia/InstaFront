import { DIR_ASC_DIRECTION } from "../Util/UtilTexts";
import { PUBLICATION_ENDPOINT } from "../Util/endpoints";
import fetchApi from "./FetchServices";

/**
 * Async function to save a publication with its image and description.
 * @param {File} img publication image.
 * @param {String} description image description.
 * @returns {Promise<Object>} data object with the body of the response.
 */
export async function save({img, description}){
    if (!img instanceof File) {
        throw new Error('img is not a file');
    }

    let data;
    const formData = new FormData();
    formData.append('img',img);
    formData.append('description',description);
    const options = {
        method: 'POST',
        headers:{},//I need this even empty for fetchApi function
        body:formData
    }

    data = await fetchApi({
        endpoint:`${PUBLICATION_ENDPOINT}/save`,
        options
    })
    return data;
}

/**
 * Async function to get publications by the current user.
 * @param {Number} param.pageNo number of the page in pagination.
 * @param {Number} param.pageSize number of elements for page in pagination.
 * @param {String} param.sortField field to sort.
 * @param {String} param.sortDir direction to sort.
 * @returns {Promise<Object>} data object with the body of the response.
 */
export async function getAllByAuthUser({
    pageNo , pageSize,sortField , sortDir, ownerId 
}){
    let data;
    const params = new URLSearchParams({
        page: pageNo || '0',
        pageSize: pageSize || '20',
        sortField: sortField || 'id',
        sortDir: sortDir || DIR_ASC_DIRECTION
    });

    const options={
        method: 'GET',
        headers:{
            'Timezone': 'America/Argentina/Buenos_Aires'
        }
    }

    data = await fetchApi({
        endpoint: `${PUBLICATION_ENDPOINT}/byOwnerId/${ownerId}?`+ params.toString(),
        options
    })

    return data;
}

/**
 * Function to get publications from users that auth user follows.
 * 
 * @param {Number} param.pageNo number of the page in pagination.
 * @param {Number} param.pageSize number of elements for page in pagination.
 * @param {String} param.sortField field to sort.
 * @param {String} param.sortDir direction to sort.
 * @returns {Promise<Object>} data object with the body of the response. 
 */
export async function getAllByFollowedUsers({
    pageNo, pageSize,sortField , sortDir 
}){
    let data;
    const params = new URLSearchParams({
        page : pageNo || '0',
        pageSize : pageSize || '20',
        sortField : sortField || 'publImgId',
        sortDir : sortDir || DIR_ASC_DIRECTION
    });

    const options = {
        method : 'GET',
        headers : {
            'Timezone' : 'America/Argentina/Buenos_Aires'
        }
    };

    data = await fetchApi({
        endpoint : `${PUBLICATION_ENDPOINT}/byUsersFollowed?${params.toString()}`,
        options
    });
    return data;
}

/**
 * Function to get publications from users visibles
 * 
 * @param {Number} param.pageNo number of the page in pagination.
 * @param {Number} param.pageSize number of elements for page in pagination.
 * @param {String} param.sortField field to sort.
 * @param {String} param.sortDir direction to sort.
 * @returns {Promise<Object>} data object with the body of the response. 
 */
export async function getAllByOwnerVisible({pageNo, pageSize,sortField , sortDir}){
    let data;
    const params = new URLSearchParams({
        page : pageNo || '0',
        pageSize : pageSize || '20',
        sortField : sortField || 'publImgId',
        sortDir : sortDir || DIR_ASC_DIRECTION
    });

    const options = {
        method : 'GET',
        headers : {
            'Timezone' : 'America/Argentina/Buenos_Aires'
        }
    }

    data = await fetchApi({
        endpoint : `${PUBLICATION_ENDPOINT}/byVisiblesOwners?${params.toString()}`,
        options
    });
    return data;

}

/**
 * Function to get all the publication info by id.
 * @param {String} id publication's id. 
 * @param {Number} param.pageNo number of the page in comment pagination.
 * @param {Number} param.pageSize number of elements for page in comment pagination.
 * @param {String} param.sortField field to sort in comment pagination.
 * @param {String} param.sortDir direction to sort in comment pagination.
 */
export async function getById({id,pageNo, pageSize,sortField , sortDir}){
    let data;
    const params = new URLSearchParams({
        page : pageNo || '0',
        pageSize : pageSize || '20',
        sortField : sortField || 'id',
        sortDir : sortDir || DIR_ASC_DIRECTION
    })


    const options = {
        method : 'GET',
        headers : {
            'Timezone' : 'America/Argentina/Buenos_Aires'
        }
    }

    data = await fetchApi({
        endpoint : `${PUBLICATION_ENDPOINT}/${id}?${params.toString()}`,
        options
    });
    return data;
};

/**
 * Async function To get publications' general info, like how many publications has a user. 
 * @param {String} id - user's id.
 * @returns {Promise<object>} publication's general info form user passed.
 */
export async function getPublicationsGeneralInfo(id){
    let data;
    const options = {
        method : 'GET',
        headers : {}       
    };

    data = await fetchApi({
        endpoint : `${PUBLICATION_ENDPOINT}/publicationGInfo/${id}`,
        options
    });
    return data;
}

/**
 * Like a publication.
 * @param {String} publicationId - publication's id.  
 * @returns {Promise<Object>} publication already liked.
 */
export async function likePublication(publicationId){
    let data;
    const options = {
        method : 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({itemId: publicationId, decision : true}) //true = liked
    };

    data = await fetchApi({
        endpoint: `${PUBLICATION_ENDPOINT}/likePublication`,
        options
    });
    return data;
}

/**
 * Delete a like record by it's itemId(in this case the itemId will be the publication's id).
 * @param {String} publicationId - publication's itemId. 
 * @returns {Promise<Object>} publication withhout the like.
 */
export async function deleteLikeOnPublication(publicationId){
    let data;
    const options = {
        method : 'DELETE',
        headers : {}
    };
    data = await fetchApi({
        endpoint : `${PUBLICATION_ENDPOINT}/delLikePublication/${publicationId}`,
        options
    });
    return data;
}