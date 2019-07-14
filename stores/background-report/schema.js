const {Schema} = require('mongoose');

module.exports = {
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'user'
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    isActive: {
        type: Boolean,
        default: true
    },
    status: String,
    turnaroundTime: Number,
    tags: String,
    candidateId: String,
    ssnTraceId: String,
    sexOffenderSearchId: String,
    nationalCriminalSearchId: String,
    federalCriminalSearchId: String,
    countyCriminalSearchIds: [ String ],
    motorVehicleReportId: String,
    stateCriminalSearchIds: [ String ],
    documentIds: [ String ]
};
