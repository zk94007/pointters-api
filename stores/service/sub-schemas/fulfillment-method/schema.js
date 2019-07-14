const { Schema } = require('../../../../databases/mongo');
const parcel = require('../parcel');
const address = require('../address');

module.exports = new Schema({
    local: {
        type: Boolean
    },
    online: {
        type: Boolean
    },
    shipment: {
        type: Boolean
    },
    store: {
        type: Boolean
    },
    localServiceRadius: {
      type: Number
    },
    localServiceRadiusUom: {
      type: String,
      enum: [ 'km', 'mile' ]
    },
    address: address.schema,
    parcel: parcel.schema
});
