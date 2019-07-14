const { create, update } = require('../../../stores/service');
const { create: createShipmentAddress } = require('../../../stores/shipment-address');
const {
  address:{
    save: saveAddress
  },
  parcel:{
    save: saveParcel
  }
} = require('../../../services/shipping');
const { create: createPost } = require('../../../stores/post');

const dynamicLink = require('../../../services/dynamic-link');


module.exports = async (ctx) => {


    let serviceToCreate = Object.assign({ userId: ctx.state.user.id }, ctx.request.body);
    

    if(ctx.request.body.fulfillmentMethod && ctx.request.body.fulfillmentMethod.address){
      const addressSaved = await saveAddress(ctx.request.body.fulfillmentMethod.address);
      if (!addressSaved || addressSaved.error) ctx.throw(404, "error creating shipment address");

      serviceToCreate.fulfillmentMethod.address.externalId = addressSaved.id;

      const shipmentAddressToCreate = Object.assign({
          userId: ctx.state.user.id,
          externalId: addressSaved.id,
          shippingApi:"easypost"
      },
      addressSaved
      );

      const doc = await createShipmentAddress(shipmentAddressToCreate);
      if (!doc || doc.error) ctx.throw(404, "error creating shipment address");
      else serviceToCreate.shipFromAddressId = doc._id;
    }

    if(ctx.request.body.fulfillmentMethod && ctx.request.body.fulfillmentMethod.parcel){
      const parcelSaved = await saveParcel(ctx.request.body.fulfillmentMethod.parcel);
      if (!parcelSaved || parcelSaved.error) ctx.throw(404, "error creating shipment parcel");
      serviceToCreate.fulfillmentMethod.parcel.externalId = parcelSaved.id;
    }

    
    


    const service = await create(serviceToCreate);
    if (service.error) ctx.throw(404, service.error.message);
    
    // create dynamic link
    const serviceLink = `/service/${service._id}`;
    const shareLink = await dynamicLink(serviceLink);
    const updateService = await update({_id: service._id}, {shareLink:shareLink});
    service.shareLink=shareLink;
    

    //create post
    let postDoc = {
      userId: ctx.state.user.id,
      message: "updated a service",
      media: service.media,
      serviceId: service._id,
      type: "service"
    };
    
    const post = await createPost( postDoc);
    if(!post || post.error) ctx.throw(500, "Technical error creating post for service");


    ctx.body = { success: true, service };




};
