const joi = require('joi');


module.exports = joi.object().keys({
    idShipment: joi.string().required(),
});
