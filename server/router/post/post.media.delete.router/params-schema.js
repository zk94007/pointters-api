const joi = require('joi');


module.exports = joi.object().keys({
    idPost: joi.string().required(),
    idMedia: joi.string().required()
});
