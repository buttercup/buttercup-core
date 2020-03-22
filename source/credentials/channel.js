const __store = {};

function getCredentials(id) {
    return __store[id] || null;
}

function removeCredentials(id) {
    __store[id] = null;
    delete __store[id];
}

function setCredentials(id, value) {
    __store[id] = value;
}

module.exports = {
    getCredentials,
    removeCredentials,
    setCredentials
};
