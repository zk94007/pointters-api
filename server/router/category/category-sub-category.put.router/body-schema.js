const joi = require('joi');


module.exports = joi.object().keys({
    keywords: joi.array().items(joi.string()).default([]),
    name: joi.string(),
});


