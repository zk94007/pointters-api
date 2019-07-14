const joi = require('joi');
const media = require('./media');

module.exports = joi.object().keys({
    sellerDeliveredMedia: joi.array().items(media)
});
