const gateway = require('./client');

module.exports = async( customerId, paymentMethodNonce, options ) => {
  try {
    //console.log('gateway.clientToken ', gateway.clientToken);
    const result = await gateway.paymentMethod.create({
      customerId: customerId,
      paymentMethodNonce: paymentMethodNonce,
      options: options
    });

    return result;
  } catch (error) {
    console.log('error occur ',error);
    return {error};
  }
}
