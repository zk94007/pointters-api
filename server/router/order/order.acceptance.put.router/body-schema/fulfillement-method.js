const joi = require('joi');


module.exports = joi.object().keys({
    local: joi.bool(),
    online: joi.bool(),
    shipment: joi.bool(),
    store: joi.bool(),
    localServiceRadius: joi.number(),
    localServiceRadiusUom: joi.string()
});
