const catchingErrorFromPromise = require('../../lib/catching-error-from-promise');


module.exports = (client) => (query) => {
    const update = { isActive: false };
    return catchingErrorFromPromise(client.findOneAndUpdate(query, update).exec());
};
