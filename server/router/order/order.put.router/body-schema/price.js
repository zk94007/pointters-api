const joi = require('joi');

const timeUnitOfMeasure = [ 'hour', 'day', 'week' ];
module.exports = joi.object().keys({
    description: joi.string(),
    location: joi.object(),
    price: joi.number(),
    priceWithoutDiscount: joi.number(),
    time: joi.number(),
    timeUnitOfMeasure: joi.string().valid(timeUnitOfMeasure)
});
