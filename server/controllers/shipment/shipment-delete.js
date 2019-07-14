const { remove: removeShipment } = require('../../../stores/shipment');

const errorMessage = 'Request does not exists';
module.exports = async(ctx) => {
    console.log('ctx.params.idShipment in delete', ctx.params.idShipment);
    const shipmentRemoved = await removeShipment({ _id: ctx.params.idShipment });
    console.log('shipmentRemoved', shipmentRemoved);
    if (!shipmentRemoved || shipmentRemoved.error) ctx.throw(404, errorMessage);

    ctx.body = { success: Boolean(shipmentRemoved.ok) };
};
