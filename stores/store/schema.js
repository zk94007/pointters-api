const {Schema} = require('mongoose');

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
    carrierFacility	:String,
    city	:String,
    company	:String,
    country	:String,
    email	:String,
    externalId: String,
    federalTaxId	:String,
    isActive: {
        type: Boolean,
        default: true
    },
    mode	:String,
    name	:String,
    object:	String,
    phone	:String,
    residential	:Boolean,
    state	:String,
    stateTaxId	:String,
    street1	:String,
    street2	:String,
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'user'
    },
    validationErrors: Object,
    verifications:verification,
    verify	:String,
    verifyStrict:String,
    zip	:String
};
