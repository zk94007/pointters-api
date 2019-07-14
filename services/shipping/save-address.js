const client = require('./client');
const snakify = require('./snakify');
const camelcasify = require('./camelcasify');
module.exports = async(address) => {
    if (!address) return await Promise.reject(new Error('addres no given'));
    const addressSnakify = snakify(address);
  //  console.log('addressSnakify  ', addressSnakify);
    const addressSaved = await new client.Address(addressSnakify).save()
        .catch((error) => ({error}));
  //  console.log('addressSaved  ', addressSaved);
    return camelcasify(addressSaved);
};
