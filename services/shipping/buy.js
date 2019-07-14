const client = require('./client');
const camelcasify = require('./camelcasify');
module.exports = async(shipment) => {
    try {
        const s = await client.Shipment.retrieve(shipment.externalId);
        const shipmentSaved = await s.buy(s.lowestRate(), shipment.amount);
        return camelcasify(shipmentSaved);
    } catch (error) {
        console.log('error', error);
        return {error};
    }
};
