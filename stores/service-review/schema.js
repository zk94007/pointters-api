const {Schema} = require('mongoose');

const { review: { minLengthForComment } } = require('../../config');
const schema = {

    comment: {
        type: String
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    isActive: {
        type: Boolean,
        default: true
    },
    qualityOfService: {
        type: Number,
        enum: [ 0, 1, 2, 3, 4, 5 ]
    },
    overallRating: {
        type: Number,
        max: 100,
        min: 0,
        default: 0
    },
    serviceId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'service'
    },
    orderId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'order'
    },
    sellerId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    userId: {
        type: Schema.Types.ObjectId,
        requied: true,
        ref: 'user'
    },
    willingToBuyServiceAgain: {
        type: Number,
        enum: [ 0, 1 ]
    }
};

module.exports = schema;
