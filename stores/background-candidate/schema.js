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
    firstName: String,
    middleName: String,
    lastName: String,
    email: String,
    phone: String,
    zipcode: String,
    dob: String,
    ssn:String,
    driverLicenseNumber: String,
    driverLicenseState: String
};
