const catchingErrorFromPromise = require('../../lib/catching-error-from-promise');

module.exports = (client) => (query, options) => catchingErrorFromPromise(client
    .paginate(query,options)
    .then((_res) => {
        return _res;
    }));
