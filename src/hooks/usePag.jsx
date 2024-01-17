import { useState } from "react";



/**
 * Pagination custom hook.
 * @param {String} param.pageNo initial number page
 * @param {String} param.pageSize initial page size
 * @param {String} param.totalPages total pages on pagination
 * @param {String} param.totalElements total elements on all the pages
 * @param {String} param.sortField elements will be sort by this field.
 * @param {DIR_DESC_DIRECTION} param.sortDir sort direction
 * @returns 
 */
export function usePag({ //is not better to pass an entire objetand on commentaries specific.
    pageNo,
    pageSize,
    totalPages,
    totalElements,
    sortField,
    sortDir,
    initialFlagPagDetails
 }) {
    const [elements, setElements] = useState([]);
    const [pagDetails, setPagDetails] = useState({pageNo,pageSize,totalPages,totalElements,sortField,sortDir});
    const [flagPagDetails, setFlagPagDetails] = useState(initialFlagPagDetails || false);

    /**
    * To change page in pagination.
    * @param {String} newPageNo - new page number 
    */
    function changePage(newPageNo) {
        setPagDetails(prev => {
            return {...prev,pageNo : newPageNo}
        });
        setFlagPagDetails(prev => true);
    };

    /**
     * It update an element and add it at the same position than before
     * 
     * @param {Object} updatedElement updated element
     * @param {String} updatedElement.id element's id. (required) 
     * @throws Error if some required param is not completed.
     */
    function updateElementById(updatedElement){
        if(!updatedElement.id){
            throw new Error(REQUIRED_PARAM);
        }
        setElements(prev => {
            //update
            const newElements = prev.map(element => {
                if(element.id === updatedElement.id){
                    return updatedElement;
                }
                return comment;
            });
            //set new elements
            return newElements;
        });
    };

    /**
     * 
     * @param {Object} updatedElement updated element.
     * @param {String} updatedElement.id element's id. (required)
     */
    function updateElementByIdAndAddItAtFront(updatedElement){
        console.log(updatedElement.id)
        if(!updatedElement.id){
            throw new Error(REQUIRED_PARAM);
        }
        setElements(prev => {
            const elementsWithoutElement = prev.filter(element => element.id !== updatedElement.id);
            return [updatedElement, ...elementsWithoutElement];
        });
    }

    /**
     * 
     * @param {String} id element's id. (required) 
     * @throws Error if some required param is not completed.
     */
    function quitElementById(id){
        if(!id){
            throw new Error(REQUIRED_PARAM);
        }
        setElements(prev => prev.filter(element => element.id !== id));
    };


    return({
        elements,
        pagDetails,
        basePagDetails : {pageNo,pageSize,totalPages,totalElements,sortField,sortDir},
        flagPagDetails,
        setFlagPagDetails,
        setElements,
        setPagDetails,
        changePage,
        updateElementById,
        updateElementByIdAndAddItAtFront,
        quitElementById
    })
}