const catchingErrorFromPromise = require('../../../../lib/catching-error-from-promise');

module.exports = (client) => async(query, media) => {
    try {
        return catchingErrorFromPromise(
            client.findOneAndUpdate(query, {
                $push:{media}
            }, {new:true}));
    } catch (error) {
        return {error};
    }
};
