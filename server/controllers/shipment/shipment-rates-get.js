const {findOne, update} = require('../../../stores/shipment');
const {getRates} = require('../../../services/shipping');

module.exports = async (ctx) => {
    const query = {
        _id: ctx.params.idShipment,
    };
    const shipment = await findOne(query);
    console.log('shipment ', shipment);
    if (!shipment || shipment.error) ctx.throw(404);
    const shipmentToSend = Object.assign({}, shipment);
    if (shipmentToSend.items) {
        shipmentToSend.customsItems = shipmentToSend.items.map((item) => {
            delete item._id;
            return item;
        });
        delete shipmentToSend.items;
    }
    const id = shipmentToSend._id;
    delete shipmentToSend._id;
    delete shipmentToSend.userId;
    console.log('shipmentToSend ', shipmentToSend);
    const saved = await getRates(shipmentToSend.externalId);
    if (!saved || saved.error) ctx.throw(404);
    await update({_id:id}, saved);
    const success = true;
    ctx.body = { rates: saved.rates, success };
};
