const {update} = require('../../../stores/shipment');

module.exports = async (ctx) => {
    const parcelToUpdate = ctx.request.body;
    const query = {
        userId: ctx.state.user.id,
        _id: ctx.params.idShipment,
    };
    const shipment = await update(query, {parcel: parcelToUpdate});
    if (!shipment || shipment.error) ctx.throw(404);

    ctx.body = { success: true, parcel:shipment.parcel };
};
