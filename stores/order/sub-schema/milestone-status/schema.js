const { Schema } = require('../../../../databases/mongo');


module.exports = new Schema({
    accepted: {
        type: Boolean
    },
    acceptedDate: {
        type: Date
    },
    completed: {
        type: Boolean
    },
    completedDate: {
        type: Date
    },
    paid: {
        type: Boolean
    },
    paidDate: {
        type: Date
    },
    scheduled: {
        type: Boolean
    },
    scheduledDate: {
        type: Date
    },
    started: {
        type: Boolean
    },
    startedDate: {
        type: Date
    },
    statusCode: {
        type: String
    },
    statusDescription: {
        type: String
    }
});
