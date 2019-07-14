const gateway = require('./client');

module.exports = async( customer ) => {
  try {
    //console.log('gateway.clientToken ', gateway.clientToken);
    const result = await gateway.customer.create( customer );

    return result;
  } catch (error) {
    console.log('error occur ',error);
    return {error};
  }
}
