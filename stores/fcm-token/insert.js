const catchingErrorFromPromise = require('../../lib/catching-error-from-promise');

module.exports = (client) => (query = {}, data = {}, options = {new:true}) => {
		console.log(query);
		console.log(data);
    try {

        return catchingErrorFromPromise(client.findOneAndUpdate(query, { $push: data }, options).exec());
    } catch (error) {
        return {error};
    }
};
