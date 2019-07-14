const catchingErrorFromPromise = require('../../lib/catching-error-from-promise');

module.exports = (client) => (query, { page = 1, limit = 10 } = {}) => catchingErrorFromPromise(client
    .paginate(query,{ page, limit})
    .then((_res) => {
        return _res;
    }));
