const joi = require('joi');


module.exports = joi.object().keys({
  paymentMethodNonce: joi.string().required()
});
