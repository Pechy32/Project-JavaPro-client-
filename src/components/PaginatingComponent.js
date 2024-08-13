import React from 'react';
import Pagination from 'react-bootstrap/pagination';
import { usePagination } from './PaginationProvider';

/**
 * PaginatingComponent is a wrapper component that handles pagination and renders children
 * with the currently displayed items. It also provides controls for changing pages and 
 * page sizes.
 *
 * @param {Object} props - The component props.
 * @param {function} props.children - A render function that receives the displayed items as an argument.
 * @returns {JSX.Element} The rendered pagination controls and paginated content.
 */
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

    /**
     * Calculates the range of page numbers to display based on the current page
     * and the total number of pages.
     *
     * @returns {number[]} An array of page numbers to display in the pagination controls.
     */
    const getPageNumbers = () => {
        let startPage, endPage;

        if (pageCount <= visiblePages) {
            // Show all pages if total page count is less than or equal to visiblePages
            startPage = 1;
            endPage = pageCount;
        } else {
            if (currentPage <= Math.ceil(visiblePages / 2)) {
                // Show the first set of pages
                startPage = 1;
                endPage = visiblePages;
            } else if (currentPage + Math.floor(visiblePages / 2) >= pageCount) {
                // Show the last set of pages
                startPage = pageCount - visiblePages + 1;
                endPage = pageCount;
            } else {
                // Show a set of pages centered around the current page
                startPage = currentPage - Math.floor(visiblePages / 2);
                endPage = currentPage + Math.floor(visiblePages / 2);
            }
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
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
                    <select
                        onChange={handlePageSizeChange}
                        value={pageSize}
                        style={{ border: "1px solid rgba(0, 0, 0, 0.1)", borderRadius: "6px" }}
                    >
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