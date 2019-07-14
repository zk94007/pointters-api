const gateway = require('./client');

module.exports = async(oldPayeeId, newPayeeId) => {
  try {
    const result = await gateway.changePayeeId(oldPayeeId, newPayeeId);
    console.log('Result = ', result);
    return result;
  } catch (error) {
    console.log('error occur', error);
    return {error};
  }
}
