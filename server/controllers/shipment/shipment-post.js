const { create: createShipment, update } = require('../../../stores/shipment');
const {shipment:{save: saveShipment}} = require('../../../services/shipping');

module.exports = async(ctx) => {
    const shipmentToCreate = Object.assign({
        userId: ctx.state.user.id,
    },
    ctx.request.body
    );
    const shipment = await createShipment(shipmentToCreate);
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
    const saved = await saveShipment(shipmentToSend);
    if (!saved || saved.error) ctx.throw(404);
    const shipmentSaved = await update({_id:id}, saved);
    const success = true;
    ctx.body = { shipmentSaved, success };
};
