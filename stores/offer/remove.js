const catchingErrorFromPromise = require('../../lib/catching-error-from-promise');


module.exports = (client) => (query) => {
    const update = { isActive: false };
    console.log('update ', update);
    console.log('query ', query);
    return catchingErrorFromPromise(client.findOneAndUpdate(query, update).exec());
};
