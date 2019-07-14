const {Schema} = require('mongoose');
const subschemas = require('./sub-schemas');

module.exports = {
    categoryId: {
        type: Schema.Types.ObjectId,
        index: true
    },
    createdAt:{
        type: Date,
        default: new Date(),
        nodeProperty: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    location: subschemas.location.schema,
    searchString: {
      type: String,
      required: true,
      nodeProperty: true
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
        relName:'Searched By'
    }
};
