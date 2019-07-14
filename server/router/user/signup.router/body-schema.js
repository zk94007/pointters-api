const joi = require('joi');


module.exports = joi.object().keys({
    password: joi.string().required(),
    email: joi.string().email().required()
});
