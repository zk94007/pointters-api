const joi = require('joi');

const timeUnitOfMeasure = [ 'hour', 'day', 'week' ];
module.exports = joi.object().keys({

    description: joi.string().required(),
    location: joi.object(),
    price: joi.number().required(),
    priceWithoutDiscount: joi.number(),
    time: joi.number().required(),
    timeUnitOfMeasure: joi.string().required().valid(timeUnitOfMeasure)
});
