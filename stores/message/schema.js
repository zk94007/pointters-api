const {Schema} = require('mongoose');
const subschemas = require('./sub-schemas');

module.exports = {
    userId : {
        type:Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'user'
    },
    conversationId : {
        type:Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'conversation'
    },
    messageText: {
        type: String
    },
    media: [ subschemas.media.schema ],
    serviceId: {
        type: Schema.Types.ObjectId,
        index: true,
        ref: 'service'
    },
    offerId: {
        type: Schema.Types.ObjectId,
        index: true,
        ref: 'offer'
    },
    requestId: {
        type: Schema.Types.ObjectId,
        index: true,
        ref: 'request'
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    deletedAt: {
        type: Date
    }
};
