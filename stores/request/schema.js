const {Schema} = require('mongoose');
const subschemas = require('./sub-schemas');

module.exports = {
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'user'
    },
    category: {
        type: Object,
        required: true
    },
    createdAt: {
        type: Date, default: new Date()
    },
    currencyCode: {
        type: String
    },
    currencySymbol: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    expirationDate: {
        type: Date
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isPrivate: {
      type: Boolean
    },
    location: {
        type: Object,
        required: true
    },
    media: [subschemas.media.schema],
    minPrice: {
        type: Number
    },
    maxPrice: {
        type: Number
    },
    scheduleDate: Date,
    sellerId: {
        type: Schema.Types.ObjectId,
        index: true,
        ref: 'user'
    },
    serviceId: {
        type: Schema.Types.ObjectId,
        index: true,
        ref: 'service'
    },
    updatedAt: {
        type: Date, default: new Date()
    },
    shareLink: {
        type: String
    }
};
