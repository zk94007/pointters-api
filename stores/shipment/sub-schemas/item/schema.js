const {Schema} = require('mongoose');


module.exports = new Schema({
    externalId: String,
    description: String,
    quantity: Number,
    weight: Number,
    value: String,
    hsTariffNumber: String,
    originCountry: String
});
