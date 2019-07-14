const { create } = require('../../../stores/shipment-address');
const {address:{save: saveAddress}} = require('../../../services/shipping');

module.exports = async(ctx) => {
  console.log('before saveAddress');
    const addressSaved = await saveAddress(ctx.request.body);
  console.log(addressSaved);    
    if (!addressSaved || addressSaved.error) ctx.throw(404, "error creating shipment address");

    const shipmentAddressToCreate = Object.assign({
        userId: ctx.state.user.id,
        externalId: addressSaved.id,
        shippingApi:"easypost"
    },
    addressSaved
    );

    const doc = await create(shipmentAddressToCreate);
    if (!doc || doc.error) ctx.throw(404, "error creating shipment address");

    ctx.body = doc;
};
