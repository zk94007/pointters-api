const {Schema} = require('mongoose');

module.exports = {
    followFrom : {
        type:Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'user',
        relName:'Followed From'
    },
    followTo : {
        type:Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'user',
        relName:'Followed To'
    },
    updatedAt: {
        type: Date,
        default: new Date(),
        nodeProperty: true
    },
    createdAt: {
        type: Date,
        default: new Date(),
        nodeProperty: true
    }
};
