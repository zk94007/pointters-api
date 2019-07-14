const { findOne } = require('../../../stores/shipment-address');

const errorMsg = 'Error in get shipment address';

module.exports = async (ctx) => {
    const query= { _id: ctx.params.idShipmentAddress, isActive: true };
    const doc = await findOne(query);

    if (!doc || doc.error) ctx.throw(403, errorMsg);

    ctx.body = doc;
};
