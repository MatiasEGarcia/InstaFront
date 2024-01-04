import { Component, useEffect, useRef, useState } from "react";
import { PAG_TYPES } from "../Util/UtilTexts";

/**
 * Component to diplay pagination.
 * @param {Array} param.itemList  list of items to show in the pagination.
 * @param {String} param.pagType  type of pagination wanted.(see PAG_TYPES in UtilTexts).
 * @param {Function} param.changePage funciton to change the current page.
 * @param {Object} param.pagDetails object with all the paginations details, like number of the page, sortField, etc.
 * @param {Component} param.ComponentToDisplayItem component that will be used to show a item from the itemList.
 * @param {Function} param.mapItem that will consume the elements of the itemsList and change it. It is for the case in which 
 * you want to make a change to the element that is iterated before displaying it.
 * @param {Element} param.observerRoot should be a reference to the element which will work as root.
 * 
 */
export default function Pagination({
    itemsList, 
    pagType, 
    changePage, 
    pagDetails, 
    ComponentToDisplayItem, 
    mapItem , 
    observerRoot
}){
    const [divVisible, setDivVisible] = useState();
    const [scrollUpFirstPageChange, setScrollUpFirstPageChange] = useState(true);//means that is the first time that the page change in scroll up.
    const refBottom = useRef();
    const refTop = useRef();


    /**
     * Use effect only for scroll down/up pagination. 
     * Change the current page if the user reach bottom of the selected div.
     */
    useEffect(() => {
        let observer;
        if(pagType === PAG_TYPES[0]){ //scroll down---cambiar el numero en cuanto pueda
            observer = new IntersectionObserver(entries => {
                const entry = entries[0];
                setDivVisible(entry.isIntersecting)
            },{
                threshold : 1,
                root: observerRoot || null
            });
            observer.observe(refBottom.current);
        }else if(pagType === PAG_TYPES[1]){//scroll up  //scroll down---cambiar el numero en cuanto pueda
            observer = new IntersectionObserver(entries => {
                const entry = entries[0];
                setDivVisible(entry.isIntersecting)
            },{
                threshold : 1,
                root: observerRoot || null
            });
            observer.observe(refTop.current);
        }

        return function cleanUp(){
            if(observer){
                observer.disconnect();
            }
        }
    },[]);


    /**
     * CHange page if divVisible is true
     */
    useEffect(() => {
        if(divVisible){
            if(pagType === PAG_TYPES[4] && scrollUpFirstPageChange) {
                setScrollUpFirstPageChange(false);
                return;
            }
            //we call next page
            changePage(pagDetails.pageNo + 1);
        }
    },[divVisible]);

    return(
        <>
            {pagType === PAG_TYPES[1] && <div ref={refTop} className="invisible">The Top</div>}
            {itemsList.length === 0
                ? <h2 className="text-center">-</h2>
                : itemsList.map((item,index) => {
                    if(mapItem){
                        item = mapItem(item);
                    }
                    return (
                        <ComponentToDisplayItem key={index}
                            item={item}/> // every component that wants to be showed in this pagination should have its content as 'item'
                    )
                })
            }
            {pagType === PAG_TYPES[0] && <div ref={refBottom} className="invisible">The bottom</div>}
        </>
    )
}