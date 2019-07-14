const joi = require('joi');
const tax = require('./tax');

module.exports = joi.object().keys({
    currencyCode: joi.string().required(),
    shipmentId: joi.string(),
    subtotal: joi.number().required(),
    tax: tax
});
