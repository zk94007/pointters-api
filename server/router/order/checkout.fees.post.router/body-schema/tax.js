const joi = require('joi');


module.exports = joi.object().keys({
  from_country: joi.string(),
  from_country_name: joi.string(),
  from_state: joi.string(),
  from_state_name: joi.string(),
  from_street: joi.string(),
  from_zip: joi.string(),
  to_country_name: joi.string(),
  to_state: joi.string(),
  to_state_name: joi.string(),
  to_street: joi.string(),
  to_zip: joi.string().required()
});
