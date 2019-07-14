const joi = require('joi');

const item = {
    description: joi.string(),
    quantity: joi.number(),
    weight: joi.number(),
    value: joi.number(),
    hsTariffNumber: joi.string(),
    originCountry: joi.string()
};
const parcel = {
    length: joi.number().required(),
    width: joi.number().required(),
    height: joi.number().required(),
    weight: joi.number().required(),
};

const address = joi.object().keys({
    street1	:joi.string().required(),
    street2	:joi.string().allow('',null),
    city	:joi.string().required(),
    state	:joi.string().allow('',null),
    zip	:joi.string().allow('',null),
    country	:joi.string().required(),
    residential	:joi.boolean(),
    carrierFacility	:joi.string(),
    name	:joi.string(),
    company	:joi.string().allow('',null),
    phone	:joi.string().allow('',null),
    email	:joi.string().allow('',null),
    federalTaxId	:joi.string(),
    stateTaxId	:joi.string(),
    verify	:joi.string(),
    verifyStrict:joi.string()
});

module.exports = joi.object().keys({
    customsCertify	: joi.boolean(),
    customsSigner: joi.string(),
    contentsType: joi.string(),
    restrictionType: joi.string(),
    eelPfc: joi.string(),
    customsItems:joi.array().items(item),
    toAddress: address,
    fromAddress: address,
    parcel: joi.object().keys(parcel)
});
