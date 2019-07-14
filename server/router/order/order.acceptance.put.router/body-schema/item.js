const joi = require('joi');


const timeUnitOfMeasure = [ 'hour', 'day', 'week' ];
module.exports = joi.object().keys({
    description: joi.string(),
    price: joi.number(),
    priceWithoutDiscount: joi.number(),    
    quantity: joi.number(),
    time: joi.number(),
    timeUnitOfMeasure: joi.string().valid(timeUnitOfMeasure)
});
