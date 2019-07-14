const joi = require('joi');

module.exports = joi.object().keys({
    serviceScheduleDate: joi.date().required(),
    serviceScheduleEndDate: joi.date().required()    
});
