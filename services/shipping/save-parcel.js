const client = require('./client');
const snakify = require('./snakify');
const camelcasify = require('./camelcasify');
module.exports = async(parcel) => {
    if (!parcel) return await Promise.reject(new Error('parcel not given'));
    const parcelSnakify = snakify(parcel);
    const parcelSaved = await new client.Parcel(parcelSnakify).save()
        .catch((error) => ({error}));
    return camelcasify(parcelSaved);
};
