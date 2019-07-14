const joi = require('joi');


const timeUnitOfMeasure = [ 'hour', 'day', 'week' ];
module.exports = joi.object().keys({
    description: joi.string().required(),
    price: joi.number().required(),
    priceWithoutDiscount: joi.number(),    
    quantity: joi.number().required(),
    time: joi.number().required(),
    timeUnitOfMeasure: joi.string().valid(timeUnitOfMeasure).required()
});
