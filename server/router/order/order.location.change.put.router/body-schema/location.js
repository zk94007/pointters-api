const joi = require('joi');


module.exports = joi.object().keys({
    city: joi.string(),
    country: joi.string(),
    geoJson: joi.object().keys({
        type: joi.string(),
        coordinates: joi.array().items(joi.number()).length(2)
    }),
    postalCode: joi.string(),
    province: joi.string(),
    state: joi.string(),
    street1: joi.string(),
    street2: joi.string()
});
