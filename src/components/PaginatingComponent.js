import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { usePagination } from './PaginationProvider';

const PaginatingComponent = ({ children }) => {
    const {
        currentPage,
        pageSize,
        displayedItems,
        pageCount,
        handlePageSizeChange,
        handlePageChange,
        pageSizeOptions,
    } = usePagination();

    const visiblePages = 5;

    const getPageNumbers = () => {
        let startPage, endPage;
        if (pageCount <= visiblePages) {
            startPage = 1;
            endPage = pageCount;
        } else {
            if (currentPage <= Math.ceil(visiblePages / 2)) {
                startPage = 1;
                endPage = visiblePages;
            } else if (currentPage + Math.floor(visiblePages / 2) >= pageCount) {
                startPage = pageCount - visiblePages + 1;
                endPage = pageCount;
            } else {
                startPage = currentPage - Math.floor(visiblePages / 2);
                endPage = currentPage + Math.floor(visiblePages / 2);
            }
        }

        return [...Array((endPage - startPage) + 1)].map((_, i) => startPage + i);
    };

    const pageNumbers = getPageNumbers();

    return (
        <>
            <div className="row">
                {children(displayedItems)}
            </div>
            <div className="row">
                <div className="col d-flex flex-wrap justify-content-center mt-3">
                    <small>Prvků na stránce:&nbsp;</small>
                    <select onChange={handlePageSizeChange} value={pageSize} style={{ border: "1px solid rgba(0, 0, 0, 0.1)", borderRadius: "6px" }}>
                        {pageSizeOptions.map(option => (
                            <option key={option._id} value={option.name}>{option.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="row">
                <Pagination className="col d-flex flex-wrap justify-content-center mt-3">
                    <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                    <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                    {pageNumbers.map((page) => (
                        <Pagination.Item
                            key={page}
                            active={page === currentPage}
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pageCount} />
                    <Pagination.Last onClick={() => handlePageChange(pageCount)} disabled={currentPage === pageCount} />
                </Pagination>
            </div>
        </>
    );
};

export default PaginatingComponent;