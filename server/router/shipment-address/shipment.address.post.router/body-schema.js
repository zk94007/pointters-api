const joi = require('joi');

module.exports = joi.object().keys({
      carrierFacility	:joi.string().allow('',null),
      city	:joi.string().required(),
      company	:joi.string().allow('',null),
      country	:joi.string().required(),
      email	:joi.string().allow('',null),
      externalId: joi.string().allow('',null),
      federalTaxId	:joi.string().allow('',null),
      isActive: joi.boolean(),
      mode	:joi.string().allow('',null),
      name	:joi.string().allow('',null),
      object:	joi.string().allow('',null),
      phone	:joi.string().allow('',null),
      residential	:joi.boolean().allow('',null),
      state	:joi.string().required(),
      stateTaxId	:joi.string().allow('',null),
      street1	:joi.string().required(),
      street2	:joi.string().allow('',null),
      zip	:joi.string().required()
});
