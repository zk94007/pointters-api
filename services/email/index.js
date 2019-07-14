const sendEmail = require('./send-email');
const bounce = require('./bounce');
const spam = require('./spam');
const invalid = require('./invalid');

module.exports = {
    sendEmail,
    bounce,
    spam,
    invalid
};
