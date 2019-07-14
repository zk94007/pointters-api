const {unset} = require('../../../stores/shipment');

module.exports = async (ctx) => {
    const query = {_id: ctx.params.idShipment};
    console.log(
        'query ', query
    );
    const parcel = await unset(query, {parcel:''});

    if (!parcel || parcel.error) ctx.throw(404);

    ctx.body = { success: true };
};
