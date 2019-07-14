const gateway = require('./client');

module.exports = async( payeeId, paymentId, payeeId, amount, description ) => {
  try {
    const result = await gateway.sendPayment(payeeId, paymentId, payeeId, amount, description, null, null, 'USD' );
    console.log('Result = ', result);
    return result;
  } catch (error) {
    console.log('error occur', error);
    return {error};
  }
}
