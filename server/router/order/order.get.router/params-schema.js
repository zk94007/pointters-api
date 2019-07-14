const joi = require('joi');


module.exports = joi.object().keys({
    idOrder: joi.string().required()
});
