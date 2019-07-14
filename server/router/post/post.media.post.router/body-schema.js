const joi = require('joi');

const mediaType = [ 'image', 'video' ];

module.exports = joi.object().keys({
    fileName:joi.string().required(),
    mediaType: joi.string().valid(mediaType).required()
});
