const joi = require('joi');

module.exports = joi.object().keys({
      carrierFacility	:joi.string().allow('',null),
      city	:joi.string(),
      company	:joi.string().allow('',null),
      country	:joi.string(),
      email	:joi.string().allow('',null),
      externalId: joi.string(),
      federalTaxId	:joi.string().allow('',null),
      isActive: joi.boolean(),
      mode	:joi.string().allow('',null),
      name	:joi.string().allow('',null),
      object:	joi.string().allow('',null),
      phone	:joi.string().allow('',null),
      residential	:joi.boolean().allow('',null),
      state	:joi.string(),
      stateTaxId	:joi.string().allow('',null),
      street1	:joi.string(),
      street2	:joi.string().allow('',null),
      verify	:joi.string().allow('',null),
      verifyStrict:joi.string().allow('',null),
      zip	:joi.string().allow('',null)
});
