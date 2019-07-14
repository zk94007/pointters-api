const joi = require('joi');


module.exports = joi.object().keys({
  paymentMethodToken: joi.string()
});
