const {Schema} = require('mongoose');

module.exports = {
    length: Number,
    width: Number,
    height: Number,
    weight: Number,
    validationErrors: Schema.Types.Mixed,
};
