const joi = require('joi');

module.exports = joi.object().keys({
    length: joi.number(),
    width: joi.number(),
    height: joi.number(),
    weight: joi.number()
});

