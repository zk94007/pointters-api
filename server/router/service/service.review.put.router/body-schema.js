const joi = require('joi');

module.exports = joi.object().keys({
    orderId:joi.string().required(),
});
