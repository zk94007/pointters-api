const verification = {
    zip4:{
        success: Boolean,
        details: {
            latitude: Number,
            longitude: Number,
            timeZone: String
        }
    },
    delivery: {
        success: Boolean,
        details: {
            latitude: Number,
            longitude: Number,
            timeZone: String
        }
    }
};

module.exports = {
    externalId: String,
    object:	String,
    mode	:String,
    street1	:String,
    street2	:String,
    city	:String,
    state	:String,
    zip	:String,
    country	:String,
    residential	:Boolean,
    carrierFacility	:String,
    name	:String,
    company	:String,
    phone	:String,
    email	:String,
    federalTaxId	:String,
    stateTaxId	:String,
    verifications:verification,
    verify	:String,
    verifyStrict:String
};
