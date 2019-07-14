const client = require('./client');
const camelcasify = require('./camelcasify');
const snakify = require('./snakify');
module.exports = async(_shipment) => {
    try {
        const shipment = Object.assign({}, snakify(_shipment));
        if (!shipment) return await Promise.reject(new Error('addres no given'));
        if (shipment.to_address.external_id)shipment.to_address.id = shipment.to_address.external_id;
        if (shipment.from_address.external_id) shipment.from_address.id = shipment.from_address.external_id;
        if (shipment.parcel.external_id) shipment.parcel.id = shipment.from_address.external_id;
        delete shipment.to_address.external_id;
        delete shipment.from_address.external_id;
        delete shipment.parcel.external_id;
        /* To Do: add cusoms info
        const customsInfo = new client.CustomsInfo(shipment);
        const customInfoSaved = await customsInfo.save();*/
        const shipmentSaved = await new client.Shipment(shipment).save();
        shipmentSaved.externalId = shipmentSaved.id;
        delete shipmentSaved.id;
        return camelcasify(shipmentSaved);
    } catch (error) {
        console.log('error', error);
        return {error};
    }
};
