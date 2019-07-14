const catchingErrorFromPromise = require('../../lib/catching-error-from-promise');

module.exports = (client) => (query, { page = 1, limit = 10, sort } = {}) => catchingErrorFromPromise(client
    .paginate(query,{ page, limit, sort})
    .then((res) => {
        return res;
    }));