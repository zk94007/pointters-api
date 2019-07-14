const catchingErrorFromPromise = require('../../lib/catching-error-from-promise');

module.exports = (client) => (query) => catchingErrorFromPromise(client
    .find(query,{isActive:0}).populate().exec()
    .then((_res) => {
        return _res;
    }));