const joi = require('joi');

const fields = [ 'generalNotifications',
    'orderNotifications',
    'offerNotifications',
    'summaryEmail'
];

module.exports = joi.object().keys({
    fields: joi.array().min(1).items(fields).required()
});
