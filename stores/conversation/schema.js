const subschemas = require('./sub-schemas');
const {Schema} = require('mongoose');

module.exports = {
    conversationTitle: {
        type: String,
        required: true
    },
    countNewMessages: {
        type: Number,
        required: true,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    lastMessage: subschemas.lastMessage.schema,
    updatedAt: {
        type: Date,
        default: new Date()
    },
    users: {
        type: Array,
        required: true
    }
};
