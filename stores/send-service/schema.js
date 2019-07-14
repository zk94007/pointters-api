const {Schema} = require('mongoose');

module.exports = {
    createdAt: {
        type: Date,
        default: new Date()
    },
    fromUserId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'user'
    },
    toUserId: [{
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'user'
    }],
    serviceId: {
        type: Schema.Types.ObjectId,
        ref: 'service',
        required: true
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
};
