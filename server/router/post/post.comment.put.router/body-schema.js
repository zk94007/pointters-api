const joi = require('joi');


module.exports = joi.object().keys({
    comment: joi.string().required()
});
