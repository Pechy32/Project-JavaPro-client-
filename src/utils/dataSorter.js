import { useState } from 'react';

const dataSorter = () => {
    const [lastSortedDirection, setLastSortedDirection] = useState("asc");

    const sorter = ({ param, isDate, isNumber }, data) => {
        const sortedData = [...data];

        sortedData.sort((a, b) => {
            let paramA, paramB;

            if (isDate) {
                paramA = new Date(a[param]);
                paramB = new Date(b[param]);
            } else {
                paramA = a[param];
                paramB = b[param];
            }

            let directionMultiplier = lastSortedDirection === 'desc' ? -1 : 1; // ordering direction (desc, asc)

            if (isNumber || isDate) {
                return (paramA - paramB) * directionMultiplier; // Date or number comparing
            } else {
                return paramA.localeCompare(paramB) * directionMultiplier; // String comparing
            }
        });

        setLastSortedDirection(lastSortedDirection === 'asc' ? 'desc' : 'asc'); // set new comparing direcion based on last one

        return sortedData;
    };

    return sorter;
};

export default dataSorter;