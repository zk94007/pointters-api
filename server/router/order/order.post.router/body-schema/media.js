const joi = require('joi');

const mediaType = [ 'image', 'video', 'document' ];
module.exports = joi.object().keys({
    fileName: joi.string().required(),
    mediaType: joi.string().valid(mediaType).required(),
    videoThumbnail: joi.string()
});
