const sendPayment = require('./send-payment');
const cancelPayment = require('./cancel-payment');
const changePayeeId  = require('./change-payee-Id');
const getAccountDetails = require('./get-account-details');
const getPayDetails = require('./get-pay-details');
const getPaymentState = require('./get-payment-state');
const getSinglePayReport = require('./get-single-payreport');

module.exports = {
  sendPayment,
  cancelPayment,
  changePayeeId,
  getAccountDetails,
  getPayDetails,
  getPaymentState,
  getSinglePayReport,
};
