const joi = require('joi');


module.exports = joi.object().keys({
    email: joi.string().email().required(),
    oldPassword: joi.string().required(),
    newPassword: joi.string().required()
});
