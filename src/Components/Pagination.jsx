import { Component, useEffect } from "react";
import { PAG_TYPES } from "../Util/UtilTexts";

/**
 * Component to diplay pagination.
 * @param {Array} param.itemList  list of items to show in the pagination.
 * @param {String} param.pagType  type of pagination wanted.(see PAG_TYPES in UtilTexts).
 * @param {Function} param.changePage funciton to change the current page.
 * @param {Object} param.pagDetails object with all the paginations details, like number of the page, sortField, etc.
 * @param {Component} param.ComponentToDisplayItem component that will be used to show a item from the itemList.
 * @param {String} param.divId in the case of a scrollDownPagination, we need this to know when to change the page
 */
export default function Pagination({
    itemsList, pagType, changePage, pagDetails, ComponentToDisplayItem,
    divId
}){
    /**
     * Use effect only for scroll down pagination. 
     * Change the current page if the user reach bottom of the selected div.
     */
    useEffect(() => {
        if(pagType === PAG_TYPES[1]){ //scrollDownPagination
            const divElement = document.getElementById(divId);
            function handleScroll(){
                const {scrollTop, clientHeight, scrollHeight} = divElement; //PONE UN BREAKPOINT ACA, LA PAGINA NO ESTA ACTUALIZANDOSE
                if(scrollTop + clientHeight === scrollHeight) {
                   // User has reached the bottom of the page
                   changePage(pagDetails.pageNo + 1);//next page.
                }
            }
            divElement.addEventListener('scroll', handleScroll);
            return() => {
                divElement.removeEventListener('scroll', handleScroll);
            };
        }
    },[]);

    /**
     * 
     * @returns an array of li elments to use in the nav pagination type, will have the total pages of the pagination.
     */
    function navLiPageElements() {
        const liPages = [];
        //I just want 5 prevPageOptions plus the current page, if not, just the possibles
        for (let i = 0, pageNoFor = pagDetails.pageNo; i < 5 && pageNoFor >= 0; i++, pageNoFor--) {
            liPages.unshift(
                <li className={`page-item ${pageNoFor === pagDetails.pageNo ? 'active disabled' : ''}`} key={pageNoFor}
                    onClick={() => changePage(pageNoFor)} >
                    <a className="page-link" href="#">
                        {pageNoFor + 1} {/*+ 1 because backend return first page as 0, but the user need to see 1 as first */}
                    </a>
                </li>
            );
        }

        //I just want 5 proxPageOptions without the current page ,that's why pageNo+1, the current page is showed in the prev for
        for (let i = 0, pageNoFor = pagDetails.pageNo + 1; i < 5 && pageNoFor < pagDetails.totalPages; i++, pageNoFor++) {
            liPages.push(
                <li className="page-item" key={pageNoFor} onClick={() => changePage(pageNoFor)} >
                    <a className="page-link" href="#">
                        {pageNoFor + 1}
                    </a>
                </li>
            );
        }
        return liPages;
    };

    return(
        <>
            {itemsList.length === 0
                ? <h2 className="text-center">-</h2>
                : itemsList.map((item,index) => {
                    return (
                        <ComponentToDisplayItem key={index}
                            item={item}/> // every component that wants to be showed in this pagination should have its content as 'item'
                    )
                })
            }
            {/*navPagination navigation*/}
            {pagType === PAG_TYPES[0] && pagDetails.totalPages && pagDetails.totalPages > 1 &&  
                <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-center mt-2">
                        <li className={`${pagDetails.pageNo === 0 ? 'page-item disabled' : 'page-item'}`}>
                            <button className="page-link" aria-label="Previous" onClick={() => changePage(pagDetails.pageNo - 1)} >
                                <span aria-hidden="true">&laquo;</span>
                            </button>
                        </li>
                        {navLiPageElements()}
                        <li className={`${pagDetails.pageNo === pagDetails.totalPages ? 'page-item disabled' : 'page-item'}`}>
                            <button className="page-link" aria-label="Next" onClick={() => changePage(pagDetails.pageNo + 1)} >
                                <span aria-hidden="true">&raquo;</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            }
        </>
    )
}