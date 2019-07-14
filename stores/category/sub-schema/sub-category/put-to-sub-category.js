const catchingErrorFromPromise = require('../../../../lib/catching-error-from-promise');

module.exports = (client) => async(query, subCategories) => {
    try {
        const category = await client.findOne(query, {subCategories:1}).exec();

        if (!category) return {};

        category.subCategories.forEach((_subCategories) => {
            _subCategories.keyword = _subCategories.keywords.concat(subCategories.keywords);
            if (subCategories.name) _subCategories.name = subCategories.name;
        });
        return await catchingErrorFromPromise(category.save());
    } catch (error) {
        return {error};
    }
};
