const Promise = require('bluebird');
const { map } = require('lodash');
const { findOne:findRequest } = require('../../../../stores/request');
const { findOne:findRequestOffer } = require('../../../../stores/request-offer');
const { findOne:findUser } = require('../../../../stores/user');
const { Types:{ObjectId} } = require('../../../../databases/mongo');
const IO = require('koa-socket.io');

module.exports =  async (d, socket)=>{
  const offer = (typeof d === 'string')?JSON.parse(d):d;
  if(!offer || !offer._id) return socket.emit("error",{error: "invalid offer"});

  const doc = await findRequestOffer({_id:ObjectId(offer._id)});
  if(!doc || doc.error) return socket.emit("error",{error: "invalid offer"});

  let result = {
    offerId: doc._id,
    currencySymbol: doc.currencySymbol,
    currencyCode: doc.currencyCode,
    description: doc.description,
    price: doc.price,
    workDuration: doc.workDuration,
    workDurationUom: doc.workDurationUom
  };

  if(doc.media && doc.media.length>0) result.media = doc.media[0];
  if(doc.location) result.location = doc.location;

  const user = await findUser({_id:doc.sellerId});
  if(user && !user.error){
    result.seller = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePic: user.profilePic
    };

    if(!result.location) result.location = user.location;
  }

  //send offer to request room
  return socket.to(doc.requestId).emit("live_offer",result);

}
