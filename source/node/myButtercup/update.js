const MAX_INT_VALUE = 2147483647;

function generateNewUpdateID() {
    return Math.floor(Math.random() * MAX_INT_VALUE);
}

module.exports = {
    generateNewUpdateID
};
