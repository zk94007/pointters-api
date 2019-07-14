const { Schema } = require('../../../../databases/mongo');


module.exports = new Schema({
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    priceWithoutDiscount: {
        type: Number
    },
    quantity: {
        type: Number,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    timeUnitOfMeasure: {
        type: String,
        required: true,
        enum: [ 'hour', 'day', 'week' ]
    }
});
