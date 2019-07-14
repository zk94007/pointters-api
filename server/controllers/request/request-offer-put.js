const { findOne, unset, update: updateOffer } = require('../../../stores/request-offer');
const {
  create: createShipmentAddress,
  update: updateShipmentAddress,
  remove: removeShipmentAddress
} = require('../../../stores/shipment-address');
const {
  address:{
    save: saveAddress
  },
  parcel:{
    save: saveParcel
  }
} = require('../../../services/shipping');
const compareObjects = require('../../../lib/object-compare');

module.exports = async(ctx) => {
    let offerToupdate = ctx.request.body;
    const existingOffer = await findOne({ _id: ctx.params.idOffer });
    if (!existingOffer || existingOffer.error) ctx.throw(404, 'offer not found');

    if ( ctx.request.body.hasOwnProperty('address') &&  ctx.request.body['address']){
      if ( existingOffer.hasOwnProperty('address') && existingOffer['address'] ) {
        if( existingOffer.address.hasOwnProperty('_id') ) delete existingOffer.address['_id'];
        if( ctx.request.body.address.hasOwnProperty('_id') ) delete ctx.request.body.address['_id'];

        const sameShipFromAddress = compareObjects(existingOffer.address, ctx.request.body.address);
        if ( !sameShipFromAddress ) {
          const addressSaved = await saveAddress(ctx.request.body.address);
          if (!addressSaved || addressSaved.error) ctx.throw(404, "error creating shipment address");
          offerToupdate.address.externalId = addressSaved.id;

          const shipmentAddressToUpdate = Object.assign({
              externalId: addressSaved.id
            },
            addressSaved
          );

          const updatedShipmentAddress = await updateShipmentAddress({_id: existingOffer.shipFromAddressId},shipmentAddressToUpdate);
          if (!updatedShipmentAddress || updatedShipmentAddress.error) ctx.throw(404,'error updating shipment address');
        }
      } else {
        const addressSaved = await saveAddress(ctx.request.body.address);
        if (!addressSaved || addressSaved.error) ctx.throw(404, "error creating shipment address");
        offerToupdate.address.externalId = addressSaved.id;

        const shipmentAddressToCreate = Object.assign({
            userId: ctx.state.user.id,
            externalId: addressSaved.id
        },
        addressSaved
        );

        const doc = await createShipmentAddress(shipmentAddressToCreate);
        if (!doc || doc.error) ctx.throw(404, "error creating shipment address doc");
        else offerToupdate.shipFromAddressId = doc._id;
      }
    } else {
      if ( existingOffer.hasOwnProperty('shipFromAddressId') && existingOffer['shipFromAddressId'] ) {
        const removedShipmentAddress = await removeShipmentAddress({_id: existingOffer.shipFromAddressId});
        if (!removedShipmentAddress || removedShipmentAddress.error){
          ctx.throw(404, 'error removing shipment address');
        } else {
          const unsetOffer = await unset({ _id: ctx.params.idOffer }, {shipFromAddressId:1,address:1,parcel:1});
          if (!unsetOffer || unsetOffer.error) ctx.throw(404, 'error unset offer shipFromAddressId');
          if (offerToupdate.hasOwnProperty('shipFromAddressId')) delete offerToupdate['shipFromAddressId'];
          if (offerToupdate.hasOwnProperty('parcel')) delete offerToupdate['parcel'];
        }
      }
    }

    if (ctx.request.body.hasOwnProperty('parcel') && ctx.request.body['parcel']) {
      if (existingOffer.hasOwnProperty('parcel') && existingOffer['parcel']) {
        const sameParcel = compareObjects(existingOffer.parcel, ctx.request.body.parcel);
        if(!sameParcel){
          if( existingOffer.parcel.hasOwnProperty('_id') ) delete existingOffer.parcel['_id'];
          if( ctx.request.body.parcel.hasOwnProperty('_id') ) delete ctx.request.body.parcel['_id'];

          const parcelSaved = await saveParcel(ctx.request.body.parcel);
          if (!parcelSaved || parcelSaved.error) ctx.throw(404, "error creating shipment parcel");
          offerToupdate.parcel.externalId = parcelSaved.id;
        }
      } else{
          const parcelSaved = await saveParcel(ctx.request.body.parcel);
          if (!parcelSaved || parcelSaved.error) ctx.throw(404, "error creating shipment parcel");
          offerToupdate.parcel.externalId = parcelSaved.id;
      }
    }

    const { error } = await updateOffer({ _id: ctx.params.idOffer }, offerToupdate);
    if (error) ctx.throw(404, error.message);

    if (!offerToupdate.serviceId && existingOffer.serviceId) {
      const unsetBody = {
        serviceId:""
      }

      const { error } = await unset({ _id: ctx.params.idOffer }, unsetBody);
    }

    ctx.body = { success: true };
};
