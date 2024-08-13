/**
 * Formats a date string into a specified format, either as a locale-specific date string or in ISO-like format (YYYY-MM-DD).
 *
 * @param {string} str - The date string to format.
 * @param {boolean} [locale=false] - If true, formats the date string in the Czech (cs-CZ) locale format.
 * @returns {string} - The formatted date string.
 */
export const formatDateString = (str, locale = false) => {
    const date = new Date(str);

    if (locale) {
        return date.toLocaleDateString("cs-CZ", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
};

export default formatDateString;