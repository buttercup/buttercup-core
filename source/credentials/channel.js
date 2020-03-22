const __store = {};

function credentialsAllowsPurpose(id, purpose) {
    const { purposes } = getCredentials(id);
    return purposes.includes(purpose);
}

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
    credentialsAllowsPurpose,
    getCredentials,
    removeCredentials,
    setCredentials
};
