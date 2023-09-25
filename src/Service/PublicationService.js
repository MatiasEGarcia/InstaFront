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