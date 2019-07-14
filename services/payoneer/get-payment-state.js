const gateway = require('./client');

module.exports = async( payeeId, paymentId ) => {
  try {
    const result = await gateway.getPaymentStatus(payeeId, paymentId);
    console.log('Result = ', result);
    return result;
  } catch (error) {
    console.log('error occur', error);
    return {error};
  }
}
