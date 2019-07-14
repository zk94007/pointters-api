const {Schema} = require('mongoose');

module.exports = {
    userId: {
        type: Schema.Types.Mixed,
        index: true,
        ref: 'user'
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
};
