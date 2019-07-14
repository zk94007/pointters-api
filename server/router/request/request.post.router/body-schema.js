const joi = require('joi');


module.exports = joi.object().keys({
    category:joi.object(),
    description: joi.string().required(),
    isPrivate: joi.boolean(),
    location:joi.object().keys({
        city: joi.string(),
        country: joi.string(),
        geoJson: joi.object().keys({
            type: joi.string().required(),
            coordinates: joi.array().items(joi.number()).length(2).required()
        }),
        postalCode: joi.string(),
        province: joi.string(),
        state: joi.string()
    }),
    media: joi.array().items(joi.object().keys({
        fileName: joi.string(),
        mediaType: joi.string().valid([ 'image', 'video','document' ]),
        videoThumbnail: joi.string()
    })),
    minPrice:joi.number(),
    maxPrice:joi.number(),
    scheduleDate:joi.date(),
    sellerId:joi.string()
});
