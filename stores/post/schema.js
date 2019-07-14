const {schema: media} = require('./sub-schema/media');
const {schema: tag} = require('./sub-schema/tag');
const {Schema} = require('mongoose');

module.exports = {
    createdAt: {
        type: Date,
        default: new Date(),
        nodeProperty: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    message: {
      type: String,
      nodeProperty: true
    },
    description:{
        type:String,
        nodeProperty: true
    },
    media: [ media ],
    serviceId : {
        type:Schema.Types.ObjectId,
        index: true,
        ref: 'service'
    },
    tags: [ tag ],
    type: {
      type:String,
      enum:['service','post']
    },
    updatedAt:{
        type: Date,
        default: new Date(),
        nodeProperty: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'user',
        relName:'Posted By'
    },
    shareLink: {
        type: String
    }
};
