const {Schema} = require('mongoose');

module.exports = {
    buyOrSell: {
      type: String,
      enum: ['buy','sell']
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    description: {
        type: String
        //required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastFromUserId: {
        type: Schema.Types.ObjectId,
        index: true,
        ref: 'user'
    },
    markedRead: {
        type: Boolean,
        default: false
    },
    postId: {
        type: Schema.Types.ObjectId,
        index: true,
        ref: 'post'
    },
    serviceId: {
        type: Schema.Types.ObjectId,
        index: true,
        ref: 'service'
    },
    toUserId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'user'
    },
    type: {
        type: String,
        required: true,
        enum: [ 'chat', 'fb_friend', 'follow', 'offer', 'order', 'post', 'request', 'request-offer', 'service', 'system' ]
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
};
