const {
  findOne,
  update,
  unset
} = require('../../../stores/service');
const {
  create: createShipmentAddress,
  update: updateShipmentAddress,
  remove: removeShipmentAddress
} = require('../../../stores/shipment-address');
const {
  address: {
    save: saveAddress
  },
  parcel:{
    save: saveParcel
  }
} = require('../../../services/shipping');
const compareObjects = require('../../../lib/object-compare');
const notification = require('../../../services/send-notification');
const getUsersTokenWithID = require('../../lib/get-notification-token');
const {
  findOne: findOneUser
} = require('../../../stores/user');

const {
  create: createNotification,
  count: countNotification
} = require('../../../stores/notification');

module.exports = async (ctx) => {
  let dataToUpdateService = ctx.request.body;
  const queryToFindService = {
    _id: ctx.params.idService
  };
  const existingService = await findOne(queryToFindService);
  
  if (!existingService || existingService.error) ctx.throw(404, 'service not found');
  if (existingService.fulfillmentMethod.hasOwnProperty('address') && ctx.request.body.fulfillmentMethod['address']) {
    if (existingService.fulfillmentMethod.hasOwnProperty('address') && existingService.fulfillmentMethod['address']) {
      if (existingService.fulfillmentMethod.address.hasOwnProperty('_id')) delete existingService.fulfillmentMethod.address['_id'];
      if (existingService.fulfillmentMethod.address.hasOwnProperty('_id')) delete ctx.request.body.fulfillmentMethod.address['_id'];

      const sameShipFromAddress = compareObjects(existingService.fulfillmentMethod.address, ctx.request.body.fulfillmentMethod.address);
      if (!sameShipFromAddress) {
        const addressSaved = await saveAddress(ctx.request.body.fulfillmentMethod.address);
        if (!addressSaved || addressSaved.error) ctx.throw(404, "error creating shipment address");

        dataToUpdateService.fulfillmentMethod.address.externalId = addressSaved.id;

        const shipmentAddressToUpdate = Object.assign({
            externalId: addressSaved.id
          },
          addressSaved
        );

        const updatedShipmentAddress = await updateShipmentAddress({
          _id: existingService.shipFromAddressId
        }, shipmentAddressToUpdate);
        if (!updatedShipmentAddress || updatedShipmentAddress.error) ctx.throw(404, 'error updating shipment address');
      }
    } else {
      const addressSaved = await saveAddress(ctx.request.body.fulfillmentMethod.address);
      if (!addressSaved || addressSaved.error) ctx.throw(404, "error creating shipment address");
      dataToUpdateService.fulfillmentMethod.address.externalId = addressSaved.id;

      const shipmentAddressToCreate = Object.assign({
          userId: ctx.state.user.id,
          externalId: addressSaved.id,
          shippingApi:"easypost"
      },
      addressSaved
      );

      const doc = await createShipmentAddress(shipmentAddressToCreate);
      if (!doc || doc.error) ctx.throw(404, "error creating shipment address doc");
      else dataToUpdateService.shipFromAddressId = doc._id;
    }
  } else {
    if (existingService.hasOwnProperty('shipFromAddressId') && existingService['shipFromAddressId']) {
      const removedShipmentAddress = await removeShipmentAddress({
        _id: existingService.shipFromAddressId
      });
      if (!removedShipmentAddress || removedShipmentAddress.error) {
        ctx.throw(404, 'error removing shipment address');
      } else {
        const unsetService = await unset(queryToFindService, {
          shipFromAddressId: ''
        });
        if (!unsetService || unsetService.error) ctx.throw(404, 'error unset service shipFromAddressId');
      }
    }
  }

  if (existingService.fulfillmentMethod.hasOwnProperty('parcel') && ctx.request.body.fulfillmentMethod['parcel']) {
    if (existingService.fulfillmentMethod.hasOwnProperty('parcel') && existingService.fulfillmentMethod['parcel']) {
      const sameParcel = compareObjects(existingService.fulfillmentMethod.parcel, ctx.request.body.fulfillmentMethod.parcel);
      if(!sameParcel){
        if (existingService.fulfillmentMethod.parcel.hasOwnProperty('_id')) delete existingService.fulfillmentMethod.parcel['_id'];
        if (ctx.request.body.fulfillmentMethod.parcel.hasOwnProperty('_id')) delete ctx.request.body.fulfillmentMethod.parcel['_id'];

        const parcelSaved = await saveParcel(ctx.request.body.fulfillmentMethod.parcel);
        if (!parcelSaved || parcelSaved.error) ctx.throw(404, "error creating shipment parcel");
        dataToUpdateService.fulfillmentMethod.parcel.externalId = parcelSaved.id;
      }
    } else{
        const parcelSaved = await saveParcel(ctx.request.body.fulfillmentMethod.parcel);
        if (!parcelSaved || parcelSaved.error) ctx.throw(404, "error creating shipment parcel");
        dataToUpdateService.fulfillmentMethod.parcel.externalId = parcelSaved.id;
    }
  }

  const updated = await update(queryToFindService, dataToUpdateService);
  if (!updated || updated.error) ctx.throw(404);
  ctx.body = {
    success: true
  };

  const serviceToken = await getUsersTokenWithID(dataToUpdateService.userId);
  //const serviceToken = await getUsersTokenWithID(require('mongoose').Types.ObjectId("5b71b24e4a94d5216c23a70a"));
  if( serviceToken.token[0].token !== ''){
    const notificationStore = Object.assign({
      lastFromUserId: ctx.state.user.id,
      description: updated.description,
      serviceId: updated._id,
      toUserId: updated.userId,
      type: 'service'
    });

    const {firstName: firstName,
           lastName: lastName} = await findOneUser({_id:ctx.state.user.id});

    const fcmNotification = await createNotification(notificationStore);
    const unreadNotifications = await countNotification({markedRead:false, toUserId:notificationStore.toUserId});
   
    const msg = {
      message: {
        notification: {
          title: `${firstName} ${lastName} updated service you watched`,
          body: existingService.description
        },
        token: serviceToken.token,
        data:{
          type:"service",
          id: existingService._id,
          notificationId:fcmNotification._id
        },
        count: unreadNotifications
      }
    };
    notification.sendNotification(msg);

  }

  
};
