import React from 'react';
import ReactPaginate from 'react-paginate';
import '../css/Paginated.scss'

const PaginatedItems = ({ itemsPerPage, pageable }) => {
    const pageCount = itemsPerPage

    const handlePageClick = (event) => {

        pageable(event.selected)
    };

    return (
        <>
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageLinkClassName='page-num'
                previousLinkClassName='page-num'
                nextLinkClassName='page-num'
                activeLinkClassName='active'
            />
        </>
    );
}
export default PaginatedItems;