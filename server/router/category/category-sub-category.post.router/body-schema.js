const joi = require('joi');


module.exports = joi.object().keys({
    keywords: joi.array().items(joi.string()),
    name: joi.string().required(),
});


