const gateway = require('./client');

module.exports = async( token, paymentMethod ) => {
  try {
    //console.log('gateway.clientToken ', gateway.clientToken);
    const result = await gateway.paymentMethod.update(token, paymentMethod);

    return result;
  } catch (error) {
    console.log('error occur ',error);
    return {error};
  }
}
