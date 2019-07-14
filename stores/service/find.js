const catchingErrorFromPromise = require('../../lib/catching-error-from-promise');

module.exports = (client) => (query) => catchingErrorFromPromise(client
    .find(query).populate().exec()
    .then((_res) => {
        return _res;
    }));
