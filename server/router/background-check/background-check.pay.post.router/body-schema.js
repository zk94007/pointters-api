const joi = require('joi');

module.exports = joi.object().keys({
    firstName: joi.string(),
    middleName: joi.string(),
    lastName: joi.string(),
    email: joi.string().email(),
    phone: joi.string(),
    zipcode: joi.string(),
    dob: joi.string(),
    ssn:joi.string(),
    driverLicenseNumber: joi.string(),
    driverLicenseState: joi.string()
});
