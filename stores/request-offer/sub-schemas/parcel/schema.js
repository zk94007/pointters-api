const {Schema} = require('mongoose');

module.exports = new Schema({
    dimensionUnitOfMeasure: {
        type: String,
        default: 'inches',
        required: true,
        enum: [ 'inches' ]
    },
    externalId: String,
    height: {
        type: Number,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    validationErrors: Schema.Types.Mixed,
    weight: {
        type: Number,
        required: true
    },
    weightUnitOfMeasure: {
        type: String,
        default: 'oz',
        required: true,
        enum: [ 'oz' ]
    },
    width: {
        type: Number,
        required: true
    }
});
