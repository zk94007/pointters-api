const joi = require('joi');


module.exports = joi.object().keys({
    idComment: joi.string(),
    idPost: joi.string()
});
