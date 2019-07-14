const {
  create: createOffer,
  update: updateOffer
} = require('../../../stores/offer');
const {
  create: createShipmentAddress
} = require('../../../stores/shipment-address');
const {
  address:{
    save: saveAddress
  },
  parcel:{
    save: saveParcel
  }
} = require('../../../services/shipping');

const {
  create: createNotification,
  count: countNotification
} = require('../../../stores/notification');


const { findOne: findOneService } = require('../../../stores/service');
const { avgRating } = require('../../../stores/service-review');
const { count: countShares } = require('../../../stores/service-share');
const { numOrders } = require('../../../stores/order');
const notification = require('../../../services/send-notification');
const {Types:{ObjectId}} = require('../../../databases/mongo');

const getBuyerTokenWithID = require('../../lib/get-notification-token');
const dynamicLink = require('../../../services/dynamic-link');

module.exports = async (ctx) => {
  let offerToCreate = Object.assign({
      userId: ctx.state.user.id
    },
    ctx.request.body
  );


  if (ctx.request.body.address) {
    const addressSaved = await saveAddress(ctx.request.body.address);
    if (!addressSaved || addressSaved.error) ctx.throw(404, "error creating shipment address");

    offerToCreate.address.externalId = addressSaved.id;

    const shipmentAddressToCreate = Object.assign({
        userId: ctx.state.user.id,
        externalId: addressSaved.id
    },
    addressSaved
    );

    const doc = await createShipmentAddress(shipmentAddressToCreate);
    if (!doc || doc.error) ctx.throw(404, "error creating shipment address");
    else offerToCreate.shipFromAddressId = doc._id;
  }

  if(ctx.request.body.parcel){
    const parcelSaved = await saveParcel(ctx.request.body.parcel);
    if (!parcelSaved || parcelSaved.error) ctx.throw(404, "error creating shipment parcel");
    offerToCreate.parcel.externalId = parcelSaved.id;
  }

  
  const offer = await createOffer(offerToCreate);
  if (offer.error) ctx.throw(404, offer.error.message);
  
  //make dynamic link
  const shareLink = await dynamicLink(`/offer/${offer._id}`);
  updateOffer({_id:offer._id}, {shareLink:shareLink});
  offer.shareLink = shareLink;  


  if(offer.serviceId){
    const ServiceData = await findOneService({ _id: ObjectId(offer.serviceId) });
    if(ServiceData)
    {
      offer.service = {
        description: ServiceData.description,
        prices: [ServiceData.prices[0]]
      };

      offer.service.pointValue = await countShares({serviceId:offer.serviceId});
      offer.service.numOrders = await numOrders({serviceId:offer.serviceId});
      offer.service.avgRating = await avgRating({serviceId:offer.serviceId});
      if (ServiceData.location && ServiceData.fulfillmentMethod.local) offer.service.location = ServiceData.location[0];
      if (ServiceData.media) offer.service.media = ServiceData.media[0];

      //populate location and media from linked service
      if ((!offer.location || !offer.media) && offer.serviceId) {
         if (!offer.location && ServiceData.location) offer.location=ServiceData.location[0];
         if ((!offer.media || offer.media.length < 1) && ServiceData.media) offer.media=ServiceData.media[0];
      }
    }
  }

  const ms_in_one_day=1000*60*60*24;
  const today = new Date();
  offer.expiresIn = Math.round((offer.updatedAt.getTime() + 7*ms_in_one_day - today.getTime())/ms_in_one_day);
  offer.expired = (offer.expiresIn<0)?true:false;

  /* temp function */
  const buyerToken = await getBuyerTokenWithID(offerToCreate.buyerId);

  ctx.body = {
    success: true,
    offer
  };

  if( buyerToken.token[0].token !== ''){
    const notificationStore = Object.assign({
      lastFromUserId: ctx.state.user.id,
      description: offer.description,
      toUserId: offerToCreate.buyerId,
      type: 'service'
    });

    const fcmNotification = await createNotification(notificationStore);
    const unreadNotifications = await countNotification({markedRead:false, toUserId:notificationStore.toUserId});

    const msg = {
      message: {
        notification: {
          title: 'You have a new offer',
          body: offerToCreate.description
        },
        token: buyerToken.token
      },
      data:{
          type:"offer",
          id: offer._id,
          notificationId:fcmNotification._id
      },
      count: unreadNotifications
    };
    console.log(msg);
    notification.sendNotification(msg);

  }

  
};
