"use client"
import { useSearchParams,useRouter } from 'next/navigation';
import React from 'react'
import Pagination from 'react-js-pagination';

interface Props {
    resultsPerPage: number
    filteredRoomsCount:number
}

const CustomPagination = ({resultsPerPage, filteredRoomsCount}: Props) => {

    const searchParams = useSearchParams();
    let page = searchParams.get("page") || 1
    page = Number(page);
    const router = useRouter();

    let queryParams: URLSearchParams;

    const handlePageChange = (currentPage:string)=>{

        if(typeof window != undefined){
            queryParams = new URLSearchParams(window.location.search)
        }

        if(queryParams.has('page')){
            queryParams.set("page", currentPage)
        }else{
            queryParams.append("page",currentPage)
        }

        const path = `${window.location.pathname}?${queryParams.toString()}`
        router.push(path)
    }
    return (
    <>
        {
            resultsPerPage < filteredRoomsCount &&
            <div className='d-flex justify-content-center mt-5'>
                <Pagination
                activePage={page}
                itemsCountPerPage={resultsPerPage}
                totalItemsCount={filteredRoomsCount}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
                nextPageText= {"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
                
                />
            </div>
        }
        
    </>
    )
}

export default CustomPagination