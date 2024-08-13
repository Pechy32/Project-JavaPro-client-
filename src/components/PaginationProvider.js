import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context to hold pagination data and functions
const PaginationContext = createContext();

/**
 * PaginationProvider component manages the state and logic for pagination.
 * It provides the current page, page size, and the sliced items to be displayed, 
 * along with handlers for changing pages and page sizes.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components that will have access to the pagination context.
 * @param {Array} props.items - The array of items to paginate.
 * @param {Array} props.pageSizeOptions - The options for page size, each containing a `name` and an `_id`.
 * @returns {JSX.Element} The pagination context provider wrapping the children components.
 */
export const PaginationProvider = ({ children, items, pageSizeOptions }) => {
    // State to track the current page and the selected page size
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(pageSizeOptions[0].name);

    // Calculate the start and end indices of the items to display
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = currentPage * pageSize;
    const displayedItems = items.slice(startIndex, endIndex);

    // Calculate the total number of pages
    const pageCount = Math.ceil(items.length / pageSize);

    /**
     * Handler for changing the page size. Resets the current page to 1 when the page size changes.
     *
     * @param {React.ChangeEvent<HTMLSelectElement>} event - The change event from the page size dropdown.
     */
    const handlePageSizeChange = (event) => {
        const newPageSize = Number(event.target.value);
        setPageSize(newPageSize);
        setCurrentPage(1); // Reset to first page when page size changes
    };

    /**
     * Handler for changing the current page.
     *
     * @param {number} page - The page number to switch to.
     */
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Reset the current page to 1 whenever the items array changes
    useEffect(() => {
        setCurrentPage(1);
    }, [items]);

    return (
        <PaginationContext.Provider
            value={{
                currentPage,
                pageSize,
                displayedItems,
                pageCount,
                handlePageSizeChange,
                handlePageChange,
                pageSizeOptions,
            }}
        >
            {children}
        </PaginationContext.Provider>
    );
};

/**
 * Custom hook to access the pagination context.
 *
 * @returns {Object} The pagination context values and functions.
 */
export const usePagination = () => useContext(PaginationContext);