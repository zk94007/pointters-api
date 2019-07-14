const {unset} = require('../../../stores/shipment');

module.exports = async (ctx) => {
    const query = {_id: ctx.params.idShipment};
    console.log(
        'query ', query
    );
    const toAddress = await unset(query, {toAddress:''});

    if (!toAddress || toAddress.error) ctx.throw(404);

    ctx.body = { success: true };
};
