const joi = require('joi');
module.exports = joi.object().keys({
    trackingCode: joi.string().required(),
    carrier: joi.string().required(),
    amount: joi.string().required(),
    reference: joi.string().required()
});


