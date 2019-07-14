const {update} = require('../../../stores/shipment');
const {address:{save: saveAddress}} = require('../../../services/shipping');

module.exports = async(ctx) => {
    const query = {
        userId: ctx.state.user.id,
        _id: ctx.params.idShipment
    };
    const shipment = await update(query, {toAddress:ctx.request.body});
    console.log('shipment  ', shipment);
    if (!shipment || shipment.error) ctx.throw(404);
    const toAddressSaved = await saveAddress(shipment.toAddress);
    const toUpdate = {'toAddress.externalId': toAddressSaved.id};
    delete toAddressSaved.id;
    const nestedAddressProp = Object.keys(toAddressSaved).reduce((obj, key) => {
        obj[`toAddress.${key}`] = toAddressSaved[key];
        return obj;
    }, {});
    Object.assign(toUpdate, nestedAddressProp);
    console.log('toUpdate    ', toUpdate);
    await update(query, toUpdate);

    ctx.body = { success: true, toAddress: shipment.toAddress };
};
