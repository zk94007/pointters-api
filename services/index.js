const email = require('./email');
const shipping = require('./shipping');
const checkr = require('./checkr');
const socialNetwork = require('./social-network');
const braintree = require('./braintree');
const sendNotification = require('./send-notification');

module.exports = {
    email,
    socialNetwork,
    shipping,
    checkr,
    braintree,
    sendNotification
};
