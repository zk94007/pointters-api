const catchingErrorFromPromise = require('../../../../lib/catching-error-from-promise');

const { isArray } = Array;

module.exports = (client) => (query, _medias) => {
    console.log('query ', query);
    try {
        const medias = isArray(_medias) ? _medias : [ _medias ];
        const update = {
            $pull: {
                media: { $in: medias }
            }
        };
        return catchingErrorFromPromise(client.findOneAndUpdate(query, update).exec());
    } catch (error) {
        return {error};
    }
};
