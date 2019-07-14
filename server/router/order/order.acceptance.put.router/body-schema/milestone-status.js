const joi = require('joi');

module.exports = joi.object().keys({
    accepted: joi.boolean(),
    acceptedDate: joi.date(),
    completed: joi.boolean(),
    completedDate: joi.date(),
    paid: joi.boolean(),
    paidDate: joi.date(),
    scheduled: joi.boolean(),
    scheduledDate: joi.date(),
    started: joi.boolean(),
    startedDate: joi.date(),
    statusCode: joi.string(),
    statusDescription: joi.string()
});
