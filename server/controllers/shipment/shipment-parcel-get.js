const {findOne} = require('../../../stores/shipment');

module.exports = async (ctx) => {
    const query = {
        _id: ctx.params.idShipment,
    };
    const shipment = await findOne(query);

    if (!shipment || shipment.error) ctx.throw(404);

    ctx.body = { success: true, parcel:shipment.parcel };
};
