const {Schema} = require('mongoose');

module.exports = {
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'user',
        relName:'Liked By'
    },
    postId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'post',
        relName:'Liked On'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    updatedAt:{
        type: Date,
        default: new Date(),
        nodeProperty: true
    },
    createdAt:{
        type: Date,
        default: new Date(),
        nodeProperty: true
    }
};
