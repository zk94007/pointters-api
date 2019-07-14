const {Schema} = require('mongoose');

module.exports = {
    userId:{
        type: Schema.Types.ObjectId,
        required: true
    },
    tokenItems: [{
        deviceType: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }],
    updatedAt: {
        type: Date,
        default: new Date()
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
};
