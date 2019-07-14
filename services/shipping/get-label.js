const client = require('./client');
const camelcasify = require('./camelcasify');
module.exports = async(id) => {
    try {
        const shipment = await client.Shipment.retrieve(id);
        const shipmentSaved = await shipment.convertLabelFormat('ZPL');
        return camelcasify(shipmentSaved);
    } catch (error) {
        console.log('error', error);
        return {error};
    }
};
