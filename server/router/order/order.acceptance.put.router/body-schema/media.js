const joi = require('joi');

const mediaType = [ 'image', 'video', 'document' ];
module.exports = joi.object().keys({
    fileName: joi.string(),
    mediaType: joi.string().valid(mediaType)
});

