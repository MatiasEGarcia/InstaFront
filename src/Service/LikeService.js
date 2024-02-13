
import { ITEM_LIKED } from "../Util/UtilTexts";
import { LIKES_ENDPOINT } from "../Util/endpoints";
import fetchApi from "./FetchServices";

/**
 * To create a like record.
 * @param {String} param.itemId item's id to like.
 * @param {boolean} param.decision false = don't like, true = like
 * @param {ITEM_LIKED} param.type type of the item(example : a publication or a comment)
 * @returns {Promise<Object>} data object with the body of the response.
 */
export async function create({itemId, decision, type}){
    let data;
    const options = {
        method : 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({itemId, decision, type})
    };

    data = await fetchApi({
        endpoint : `${LIKES_ENDPOINT}`,
        options
    });

    return data;
};

/**
 * Delete a like record by it's itemId(in this case the itemId will be the publication's id)
 * @param {String} publicationId - like's itemId. 
 */
export async function deleteByPublicationId(publicationId){
    let data;
    const options = {
        method : 'DELETE',
        headers : {}
    }
    data = await fetchApi({
        endpoint : `${LIKES_ENDPOINT}/byPublicatedImageId/${publicationId}`,
        options
    });
    return data;
}
