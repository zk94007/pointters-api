const joi = require('joi');

module.exports = joi.object().keys({
    first_name: joi.string().required(),
    middle_name: joi.string(),
    last_name: joi.string().required(),
    email: joi.string().email().required(),
    phone: joi.string(),
    zipcode: joi.string(),
    dob: joi.string(),
    ssn: joi.string(),
    driver_license_number: joi.string(),
    driver_license_state: joi.string()
});
