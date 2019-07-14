const { Schema } = require('../../../../databases/mongo');


module.exports = new Schema({
      carrierFacility	:String,
      city	:String,
      company	:String,
      country	:String,
      email	:String,
      externalId: String,
      federalTaxId	:String,
      mode	:String,
      name	:String,
      object:	String,
      phone	:String,
      residential	:Boolean,
      state	:String,
      stateTaxId	:String,
      street1	:String,
      street2	:String,
      verify	:String,
      verifyStrict:String,
      zip	:String
});
