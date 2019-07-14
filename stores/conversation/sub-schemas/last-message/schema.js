const { Schema } = require('../../../../databases/mongo');


module.exports = new Schema({
    time: {
        type: Date
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    message: {
        type: String
    },
    userId: {
        type:Schema.Types.ObjectId,
        ref: 'user'
    }
});
