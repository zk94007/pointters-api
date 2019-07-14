const gateway = require('./client');

module.exports = async( id, merchantAccountParams ) => {
  try {
    //console.log('gateway.clientToken ', gateway.clientToken);
    const result = await gateway.merchantAccount.update(id, merchantAccountParams);

    return result;
  } catch (error) {
    console.log('error occur ',error);
    return {error};
  }
}
