import React from 'react';
import ReactPaginate from 'react-paginate';

function CommonPagination(props) {
    return (
        <div className='d-flex justify-content-center mb-4'>
            <ReactPaginate
                breakLabel="..."
                nextLabel="»"
                onPageChange={props.hitAction}
                pageCount={props.total / props.pageLimit}
                previousLabel="«"
                renderOnZeroPageCount={null}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                forcePage={props.currentPage}
            />
        </div>
    );
}

export default CommonPagination;