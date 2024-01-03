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
        sortField: sortField || 'publImgId',
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
 */
export async function getById(id){
    let data;

    const options = {
        method : 'GET',
        headers : {
            'Timezone' : 'America/Argentina/Buenos_Aires'
        }
    }

    data = await fetchApi({
        endpoint : `${PUBLICATION_ENDPOINT}/${id}`,
        options
    });
    return data;
}