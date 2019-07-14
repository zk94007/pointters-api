const joi = require('joi');

const generalNotifications = [ 'pushNotification', 'email', 'all', 'none' ];
const orderNotifications = [ 'pushNotification', 'email', 'all', 'none' ];
const offerNotifications = [ 'pushNotification', 'email', 'all', 'none' ];
const summaryEmail = [ 'daily', 'weekly', 'all', 'none' ];

module.exports = joi.object().keys({
    generalNotifications: joi.string().valid(generalNotifications),
    orderNotifications: joi.string().valid(orderNotifications),
    offerNotifications: joi.string().valid(offerNotifications),
    summaryEmail: joi.string().valid(summaryEmail)
});
