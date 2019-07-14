const joi = require('joi');

const mediaType = [ 'image', 'video' ];

module.exports = joi.object().keys({
    message: joi.string(),
    media: joi.array().items(joi.object().keys({
        fileName:joi.string().required(),
        mediaType: joi.string().valid(mediaType).required()
    })),
    tags: joi.array().items(joi.object().keys({
        type:joi.string().valid(['service','user']),
        id: joi.string()
    }))
});
