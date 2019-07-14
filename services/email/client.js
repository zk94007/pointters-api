const SendGrid = require('sendgrid');


const {emailSenderingCong:{ sendgridApiKey}} = require('../../config');

const sg = SendGrid(sendgridApiKey);

module.exports = sg;
