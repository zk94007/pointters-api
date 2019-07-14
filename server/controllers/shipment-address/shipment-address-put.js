const { update } = require('../../../stores/shipment-address');
const {address:{save: saveAddress}} = require('../../../services/shipping');

module.exports = async (ctx) => {

    let address = ctx.request.body;
    if (address.id) delete address.id;
    if (address._id) delete address._id;
    const addressSaved = await saveAddress(address);
    if (!addressSaved || addressSaved.error) ctx.throw(404, "error updating shipment address");

    const shipmentAddressToUpdate = Object.assign({
        externalId: addressSaved.id
    },
    addressSaved
    );

    const doc = await update({ _id: ctx.params.idShipmentAddress }, shipmentAddressToUpdate);
    if (!doc || doc.error) ctx.throw(404, "error updating shipment address");

    ctx.body = doc;

};
