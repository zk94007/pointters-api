const joi = require('joi');

module.exports = joi.object().keys({
    mode	:joi.string(),
    street1	:joi.string(),
    street2	:joi.string(),
    city	:joi.string(),
    state	:joi.string(),
    zip	:joi.string(),
    country	:joi.string(),
    residential	:joi.boolean(),
    carrierFacility	:joi.string(),
    name	:joi.string(),
    company	:joi.string(),
    phone	:joi.string(),
    email	:joi.string(),
    federalTaxId	:joi.string(),
    stateTaxId	:joi.string(),
});

