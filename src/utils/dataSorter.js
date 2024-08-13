import { useState } from 'react';

/**
 * A custom hook that returns a sorter function for sorting data based on a specified parameter.
 * The sorter function can handle sorting by strings, numbers, or dates, and toggles the sort direction between ascending and descending.
 *
 * @returns {Function} sorter - A function that sorts data based on the provided parameter and criteria.
 */
const useDataSorter = () => {
    const [lastSortedDirection, setLastSortedDirection] = useState("asc");

    /**
     * Sorts the provided data array based on the specified parameter and type (date, number, or string).
     *
     * @param {Object} options - The sorting options.
     * @param {string} options.param - The key of the data objects to sort by.
     * @param {boolean} options.isDate - Whether the parameter is a date.
     * @param {boolean} options.isNumber - Whether the parameter is a number.
     * @param {Array} data - The array of data to sort.
     * @returns {Array} - The sorted array of data.
     */
    const sorter = ({ param, isDate = false, isNumber = false }, data) => {
        const sortedData = [...data]; // Clone the data array to avoid mutating the original array

        sortedData.sort((a, b) => {
            let paramA = isDate ? new Date(a[param]) : a[param];
            let paramB = isDate ? new Date(b[param]) : b[param];

            const directionMultiplier = lastSortedDirection === 'desc' ? -1 : 1;

            if (isNumber || isDate) {
                return (paramA - paramB) * directionMultiplier;
            } else {
                return paramA.localeCompare(paramB) * directionMultiplier;
            }
        });

        // Toggle the sorting direction for the next sort operation
        setLastSortedDirection(lastSortedDirection === 'asc' ? 'desc' : 'asc');

        return sortedData;
    };

    return sorter;
};

export default useDataSorter;