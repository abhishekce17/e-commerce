function dateFormate(seconds) {
    const timestampInSeconds = seconds; // Replace with your timestamp
    const date = new Date(timestampInSeconds * 1000); // Convert to milliseconds

    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Months are zero-based
    const year = date.getUTCFullYear();

    // Pad single-digit day and month values with leading zeros if needed
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
    return formattedDate; // Output: 14/04/2023
}

export { dateFormate };