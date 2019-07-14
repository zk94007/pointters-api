const {
  braintree: braintreeConfig
} = require('../../config');
const braintree = require('braintree');
const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: braintreeConfig.merchantId,
  publicKey: braintreeConfig.publicKey,
  privateKey: braintreeConfig.privateKey
});

module.exports = gateway;