const subschemas = require('./sub-schemas');
const {Schema} = require('mongoose');

module.exports = {
    category: {
        type: {},
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    description: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    fulfillmentMethod: {
      type: subschemas.fulfillmentMethod.schema,
      required: true
    },
    geofence: {
        type: Array
    },
    location: {
      type:[ subschemas.location.schema ],
      required:true
    },
    media: {
      type: [ subschemas.media.schema ],
      required: true
    },
    prices: {
      type: [ subschemas.price.schema ],
      required: true
    },
    promoted: {
      type: Boolean
    },
    shipFromAddressId: {
      type:Schema.Types.ObjectId,
      ref: 'shipment-address'
    },
    tagline: {
        type: String
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
    userId: {
        type:Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'user'
    },
    shareLink: {
        type: String
    }
};
