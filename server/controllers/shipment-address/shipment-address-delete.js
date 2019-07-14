const { remove } = require('../../../stores/shipment-address');

const errorMessage = 'Shipment address does not exists';
module.exports = async(ctx) => {
    const docRemoved = await remove({ _id: ctx.params.idShipmentAddress });
    if (!docRemoved || docRemoved.error) ctx.throw(404, errorMessage);

    ctx.body = { success: true };
};
