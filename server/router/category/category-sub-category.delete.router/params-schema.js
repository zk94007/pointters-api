const joi = require('joi');


module.exports = joi.object().keys({
    idCategory: joi.string(),
    idSubCategory: joi.string().required()
});
