const joi = require('joi');


module.exports = joi.object().keys({
    idShipmentAddress: joi.string().required()
});
