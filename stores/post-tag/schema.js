const {Schema} = require('mongoose');

module.exports = {
    createdAt:{
        type: Date,
        default: new Date(),
        nodeProperty: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    postId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'post',
        relName:'Tagged On'
    },    
    taggedServiceId: {
        type: Schema.Types.ObjectId,
        index: true,
        ref: 'service',
        relName:'Tagged Service'
    },
    taggedUserId: {
        type: Schema.Types.ObjectId,
        index: true,
        ref: 'user',
        relName:'Tagged User'
    },
    type: {
      type:String,
      enum:['service','user']
    },
    updatedAt:{
        type: Date,
        default: new Date(),
        nodeProperty: true
    }
};
