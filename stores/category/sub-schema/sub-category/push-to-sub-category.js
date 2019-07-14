const catchingErrorFromPromise = require('../../../../lib/catching-error-from-promise');

module.exports = (client) => (query, subCategory) => catchingErrorFromPromise(
    (async() => {
        try {
            const doc = await client.findOne(query,{isActive:0});
            if (!doc) return {error:new Error('Category does not exists')};
            doc.subCategories.push(subCategory);
            const saved = await doc.save();
            const savedPlane = saved.toObject();
            savedPlane.subCategories.forEach((sub) => {
                sub._id = sub._id.toString();
            });
            return {subCategories:savedPlane.subCategories};
        } catch (error) {
            return {error};
        }
    })());
