const catchingErrorFromPromise = require('../../lib/catching-error-from-promise');

module.exports = (client) => (query, { page = 1, limit = 20, sort } = {}) => catchingErrorFromPromise(client
    .paginate(query,{ page, limit, sort})
    .then((_res) => {
        return _res;
    }));
