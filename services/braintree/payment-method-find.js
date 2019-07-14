const gateway = require('./client');

module.exports = async( token ) => {
  try {
    //console.log('gateway.clientToken ', gateway.clientToken);
    const result = await gateway.paymentMethod.find(token);

    return result;
  } catch (error) {
    console.log('error occur ',error);
    return {error};
  }
}
