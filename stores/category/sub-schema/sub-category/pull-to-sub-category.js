const catchingErrorFromPromise = require('../../../../lib/catching-error-from-promise');

const { isArray } = Array;

module.exports = (client) => (query, _subCategories) => {
    try {
        const subCategories = isArray(_subCategories) ? _subCategories : [ _subCategories ];
        const update = {
            $pull: {
                subCategories: { $in: subCategories }
            }
        };
        return catchingErrorFromPromise(client.findOneAndUpdate(query, update).exec());
    } catch (error) {
        return {error};
    }
};
