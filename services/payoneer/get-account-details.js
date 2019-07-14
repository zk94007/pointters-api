const gateway = require('./client');

module.exports = async() => {
  try {
    const result = await gateway.getAccountDetails();
    console.log('Result = ', result);
    return result;
  } catch (error) {
    console.log('error occur', error);
    return {error};
  }
}
