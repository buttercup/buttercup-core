const MAX_INT_VALUE = 2147483647;

/**
 * Generate a new update ID
 * @returns {Number} A randomly generated ID
 */
function generateNewUpdateID() {
    return Math.floor(Math.random() * MAX_INT_VALUE);
}

module.exports = {
    generateNewUpdateID
};
