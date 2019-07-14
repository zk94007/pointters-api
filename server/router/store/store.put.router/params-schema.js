const joi = require('joi');


module.exports = joi.object().keys({
    idStore: joi.string().required(),
});
