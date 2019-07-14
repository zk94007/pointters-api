const joi = require('joi');


module.exports = joi.object().keys({
    id_gt: joi.string()
});
