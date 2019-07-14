const { update: updateShipment } = require('../../../../stores/shipment');
const getQuery = require('./get_query');
const getUpdate = require('./get-update');
module.exports = async (ctx) => {
    const query = getQuery(ctx);
    const update = ctx.request.body;
    const shipment = await updateShipment(query, update);
    if (!shipment || shipment.error) ctx.throw(404);

    ctx.body = shipment;
};
