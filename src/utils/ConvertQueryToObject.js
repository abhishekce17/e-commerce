export function convertStringToObject(inputString) {
    // Step 1: Replace the characters as specified
    let processedString = inputString
        .replace(/\+/g, ' ')    // Replace + with space
        .replace(/%2B/g, '+')   // Replace %2B with +
        .replace(/=/g, ':')     // Replace = with :
        .replace(/&/g, ',');    // Replace & with ,

    // Step 2: Split the string into key-value pairs
    let pairs = processedString.split(',');

    // Step 3: Create an object from the key-value pairs
    let result = {};
    pairs.forEach(pair => {
        let [key, value] = pair.split(':');
        result[key] = value;
    });

    return result;
}