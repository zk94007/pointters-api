const {Schema} = require('mongoose');

module.exports = {
    userId : {
        type:Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'user'
    },
    serviceId : {
        type:Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'service'
    },
    sellerId : {
        type:Schema.Types.ObjectId,
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
};
