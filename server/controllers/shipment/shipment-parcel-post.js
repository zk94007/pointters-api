const {update} = require('../../../stores/shipment');
const {parcel:{save: saveParcel}} = require('../../../services/shipping');

module.exports = async(ctx) => {
    const query = {
        userId: ctx.state.user.id,
        _id: ctx.params.idShipment
    };
    const shipment = await update(query, {parcel:ctx.request.body});
    if (!shipment || shipment.error) ctx.throw(404);
    const parcelSaved = await saveParcel(shipment.parcel);
    const toUpdate = {'parcel.externalId': parcelSaved.id};
    delete parcelSaved.id;
    const nestedAddressProp = Object.keys(parcelSaved)
        .reduce((obj, key) => {
            obj[`parcel.${key}`] = parcelSaved[key];
            return obj;
        }, {});
    Object.assign(toUpdate, nestedAddressProp);
    const updated = await update(query, toUpdate);
    if (!updated || updated.error) ctx.throw(404);
    ctx.body = { success: true, parcel :shipment.parcel };
};
