const gateway = require('./client');

module.exports = async( sale ) => {
  try {
    //console.log('gateway.clientToken ', gateway.clientToken);
    const result = await gateway.transaction.sale(sale);

    return result;
  } catch (error) {
    console.log('error occur ',error);
    return {error};
  }
}
