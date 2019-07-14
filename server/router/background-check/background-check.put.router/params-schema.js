const joi = require('joi');

module.exports = joi.object().keys({
  id: joi.string()
});
