const joi = require('joi');
const location = require('./location');

module.exports = joi.object().keys({
    buyerServiceLocation: location.required()
});
