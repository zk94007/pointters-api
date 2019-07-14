const gateway = require('./client');

module.exports = async( customerId, customer ) => {
  try {
    //console.log('gateway.clientToken ', gateway.clientToken);
    const result = await gateway.customer.update( customerId, customer );

    return result;
  } catch (error) {
    console.log('error occur ',error);
    return {error};
  }
}
