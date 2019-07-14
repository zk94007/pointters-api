const joi = require('joi');


module.exports = joi.object().keys({
    awards: joi.string().allow(''),
    companyName: joi.string().allow(''),
    description: joi.string(),
    education: joi.string().allow(''),
    email: joi.string(),
    password: joi.string(),
    firstName: joi.string(),
    insurance: joi.string().allow(''),
    lastName: joi.string(),
    license: joi.string().allow(''),
    location: joi.object().keys({
        city: joi.string(),
        country: joi.string(),
        geoJson: joi.object().keys({
            type: joi.string().required(),
            coordinates: joi.array().items(joi.number()).length(2).required()
        }).required(),
        postalCode: joi.string(),
        province: joi.string(),
        state: joi.string()
    }),
    phone: joi.string(),
    profilePic: joi.string(),
    profileBackgroundMedia: joi.array().items(joi.object().keys({
        fileName: joi.string(),
        mediaType: joi.string().valid([ 'image', 'video' ]),
        videoThumbnail: joi.string()
    }))
});
