const subschemas = require('./sub-schemas');
const {Schema} = require('mongoose');

module.exports = {
    address: subschemas.address.schema,
    buyerId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'user'
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    currencyCode: {
        type: String,
        required: true
    },
    currencySymbol: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    fulfillmentMethod: {
      type: subschemas.fulfillmentMethod.schema,
      required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    location: {
      type: subschemas.location.schema,
      required: true
    },
    media: [subschemas.media.schema],
    parcel: subschemas.parcel.schema,
    price:{
        type: Number,
        required: true
    },
    priceWithoutDiscount: {
        type: Number
    },
    sellerId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'user'
    },
    serviceId: {
        type: Schema.Types.ObjectId,
        ref: 'service'
    },
    shipFromAddressId: {
      type:Schema.Types.ObjectId,
      ref: 'shipment-address'
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
    workDuration: {
        type: Number,
        required: true
    },
    workDurationUom: {
        type: String,
        enum: [ 'hour', 'day', 'week' ],
        required: true
    },
    shareLink: {
        type: String
    }
};
