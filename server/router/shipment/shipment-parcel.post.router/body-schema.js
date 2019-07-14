const joi = require('joi');

module.exports = joi.object().keys({
    length: joi.number().required(),
    width: joi.number().required(),
    height: joi.number().required(),
    weight: joi.number().required()
});

