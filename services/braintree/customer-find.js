const gateway = require('./client');

module.exports = async( customerId ) => {
  try {
    //console.log('gateway.clientToken ', gateway.clientToken);
    const result = await gateway.customer.find( customerId );
    return result;
  } catch (error) {
    console.log('error occur ',error);
    return {error};
  }
}
