const joi = require('joi');


module.exports = joi.object().keys({
    idRequest: joi.string()
});
