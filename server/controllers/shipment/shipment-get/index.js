const { find: findShipment, count } = require('../../../../stores/shipment');
const {pagination:{shipments:limit}} = require('../../../../config');
const {Types:{ObjectId}} = require('../../../../databases/mongo');
const getQuery = require('./get-query');

const errorInGetWatching = 'Error in get to shipment-shipment';
module.exports = async (ctx) => {
    const query = getQuery(ctx);
    const shipments = await findShipment(query, {limit});
    if (!shipments || shipments.error) ctx.throw(404, errorInGetWatching);

    if (ctx.params.idShipment) {
        ctx.body = {
            shipment: shipments[0]
        };
        return;
    }
    ctx.body = {shipments};
    const lastOne = shipments[shipments.length - 1];
    const remaining = await count({_id:{$gt: ObjectId(lastOne._id)}});
    if (remaining) ctx.body.next = `${ctx.url}?id_gt=${lastOne._id}`;
};
