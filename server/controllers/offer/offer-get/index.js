let { find: findOffer, count } = require('../../../../stores/offer');
let { findOne: findOneService } = require('../../../../stores/service');
let { avgRating } = require('../../../../stores/service-review');
let { count: countShares } = require('../../../../stores/service-share');
let { numOrders } = require('../../../../stores/order');
let { findOne: findOneUser } = require('../../../../stores/user');
let {pagination:{offers:limit}} = require('../../../../config');
let {Types:{ObjectId}} = require('../../../../databases/mongo');
let getQuery = require('./get-query');

let errorInGetWatching = 'Error in get to offer';
module.exports = async (ctx) => {	  
    let query = getQuery(ctx);

    if(ctx.query.userId){
  		let chatUser = await findOneUser({ _id: ObjectId(ctx.query.userId) });
  		if(!chatUser || chatUser.error) ctx.throw(404, 'Invalid chat user');
  		query = {
        $or:[
          { $and:[
            {sellerId:ObjectId(ctx.queryToFindUserById._id)},
            {buyerId:ObjectId(chatUser._id)} ] },
          { $and:[
            {sellerId:ObjectId(chatUser._id)},
            {buyerId:ObjectId(ctx.queryToFindUserById._id)} ] }
          ],
  			isActive: true
  		};
  	}

    let offers = await findOffer(query, {limit});
    if (!offers || !offers.length || offers.error) ctx.throw(404, errorInGetWatching);

    let ms_in_one_day=1000*60*60*24;
    let today = new Date();
		offers[0].expiresIn = Math.round((offers[0].updatedAt.getTime() + 7*ms_in_one_day - today.getTime())/ms_in_one_day);
    offers[0].expired = (offers[0].expiresIn<0)?true:false;

    if (ctx.params.idOffer) {
      let ServiceData = await findOneService({ _id: ObjectId(offers[0].serviceId) });
      if(ServiceData)
      {
        offers[0].service = {
          description: ServiceData.description
        };

        if(ctx.query.device == 'mobile'){
          offers[0].service.prices = [ServiceData.prices[0]];
        }else{
          offers[0].service.price = ServiceData.prices[0];
        }

        offers[0].service.pointValue = await countShares({serviceId:offers[0].serviceId});
        offers[0].service.numOrders = await numOrders({serviceId:offers[0].serviceId});
        offers[0].service.avgRating = await avgRating({serviceId:offers[0].serviceId});
        if (ServiceData.location && ServiceData.fulfillmentMethod.local) offers[0].service.location = ServiceData.location[0];
        if (ServiceData.media) offers[0].service.media = ServiceData.media[0];

        //populate location and media from linked service
        if ((!offers[0].location || !offers[0].media) && offers[0].serviceId) {
           if (!offers[0].location && ServiceData.location) offers[0].location=ServiceData.location[0];
           if ((!offers[0].media || offers[0].media.length < 1) && ServiceData.media) offers[0].media=ServiceData.media[0];
        }
      }

      //populate buyer or seller data
      if(ctx.state.user.id != offers[0].sellerId && ctx.state.user.id != offers[0].buyerId)
        ctx.throw(404, 'Only buyer or seller can view offer detail');

      let seller = await findOneUser({ _id: ObjectId(offers[0].sellerId) });
      if(seller && !seller.error){
        offers[0].seller = {
          firstName: seller.firstName,
          lastName: seller.lastName,
          profilePic: seller.profilePic
        };
      }

      let buyer = await findOneUser({ _id: ObjectId(offers[0].buyerId) });
      if(buyer && !buyer.error){
        offers[0].buyer = {
          firstName: buyer.firstName,
          lastName: buyer.lastName,
          profilePic: buyer.profilePic
        };
      }

      //populate location and media from user when fulfillmentMethod is local or store
      if((!offers[0].location || !offers[0].media) && (offers[0].fulfillmentMethod.local || offers[0].fulfillmentMethod.store)){
        if(seller && !seller.error)
        {
          if (!offers[0].location && seller.location) offers[0].location=seller.location;
          if (!offers[0].media || offers[0].media.length < 1 ) {
            offers[0].media=[{
              fileName:seller.profilePic,
              mediaType:"image"
            }];
          }
        }
      }

      ctx.body = {
          offer: offers[0]
      };
      return;
    }
    ctx.body = {offers};
    let lastOne = offers[offers.length - 1];
    let remaining = await count({_id:{$gt: ObjectId(lastOne._id)}});
    if (remaining) ctx.body.next = `${ctx.url}?id_gt=${lastOne._id}`;
};
