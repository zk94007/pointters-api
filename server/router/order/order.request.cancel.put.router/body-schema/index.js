const joi = require('joi');
const cancellation = require('./cancellation');

module.exports = joi.object().keys({
    buyerOrderDispute: cancellation.required()
});
