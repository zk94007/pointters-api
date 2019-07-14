const Promise = require('bluebird');
const {
  map
} = require('lodash');
const {
  findOne: findOneConversation,
  update: updateConversation
} = require('../../../stores/conversation');
const {
  create: createMessage
} = require('../../../stores/message');
const {
  findOne: findOneUser
} = require('../../../stores/user');
const {
  findOne: findOneOffer
} = require('../../../stores/offer');
const {
  findOne: findOneService
} = require('../../../stores/service');
const {
  findOne: findOneRequest
} = require('../../../stores/request');
const {
  Types: {
    ObjectId
  }
} = require('../../../databases/mongo');
const IO = require('koa-socket.io');
const notification = require('../../../services/send-notification');

//socket'io listener cb
//register it in /lib/socket.js
module.exports = async (d, socket) => {
  const message = (typeof d === 'string') ? JSON.parse(d) : d;
  if (!message)
    return socket.emit("message_error", {
      error: "invalid message body"
    });

  //validate conversationId
  if (!message.conversationId) return socket.emit("message_error", {
    error: "invalid conversationId"
  });
  const conversation = await findOneConversation({
    _id: ObjectId(message.conversationId)
  });
  if (!conversation) return socket.emit("message_error", {
    error: "invalid conversationId"
  });

  //validate userId
  if (!message.userId) return socket.emit("message_error", {
    error: "invalid userId"
  });
  const user = await findOneUser({
    _id: ObjectId(message.userId)
  });
  if (!user) return socket.emit("message_error", {
    error: "invalid userId"
  });

  //create message
  const newMessage = await createMessage(message);
  if (!newMessage || newMessage.error) return socket.emit("message_error", "Error message create");

  //if messageText is blank then default messageText by action
  let messageActionText = !message.messageText ? "" : message.messageText;
  if (!message.messageText) {
    if (message.media && message.media.length > 0 && message.media[0].mediaType) messageActionText = "sent a " + message.media[0].mediaType;
    else if (message.serviceId) messageActionText = "sent a service";
    else if (message.offerId) messageActionText = "sent an offer";
    else if (message.requestId) messageActionText = "sent a request";
  }

  //update conversation
  const updatedConversation = await updateConversation({
    _id: message.conversationId
  }, {
    lastMessage: {
      time: newMessage.createdAt,
      firstName: user.firstName,
      lastName: user.lastName,
      message: messageActionText,
      userId: message.userId
    }
  });


  //construct message result
  let result = {};
  result.result = {
    message: {
      createdAt: newMessage.createdAt,
      id: newMessage._id,
      media: newMessage.media,
      messageText: newMessage.messageText
    }
  };

  //populate service fields
  if (newMessage.serviceId) {
    const service = await findOneService({
      _id: newMessage.serviceId
    });
    if (service) {
      result.result.message.service = {};
      result.result.message.service.serviceId = newMessage.serviceId;
      result.result.message.service.description = service.description;
      if (service.media) result.result.message.service.media = service.media[0];
      if (service.prices && service.prices[0]) result.result.message.service.price = service.prices[0];
      const seller = await findOneUser({
        _id: service.userId
      });
      if (seller) {
        result.result.message.service.seller = {
          firstName: seller.firstName,
          lastName: seller.lastName
        };
      }
    }
  }

  //populate result with offer
  if (newMessage.offerId) {
    const offer = await findOneOffer({
      _id: newMessage.offerId
    });
    if (offer) {
      result.result.message.offer = {};
      result.result.message.offer.offerId = newMessage.offerId;
      result.result.message.offer.description = offer.description;
      if (offer.media && offer.media.length > 0) result.result.message.offer.media = offer.media[0];
      result.result.message.offer.currencyCode = offer.currencyCode;
      result.result.message.offer.currencySymbol = offer.currencySymbol;
      result.result.message.offer.price = offer.price;
      result.result.message.offer.priceWithoutDiscount = offer.priceWithoutDiscount;
      result.result.message.offer.workDuration = offer.workDuration;
      result.result.message.offer.workDurationUom = offer.workDurationUom;

      const seller = await findOneUser({
        _id: offer.sellerId
      });
      if (seller) {
        result.result.message.offer.seller = {
          firstName: seller.firstName,
          lastName: seller.lastName,
          location: seller.location
        };
      }

      //populate linked service
      if (offer.serviceId) {
        result.result.message.offer.service = {};
        result.result.message.offer.service.serviceId = offer.serviceId;
        const linkedService = await findOneService({
          _id: offer.serviceId
        });
        if (linkedService) {
          result.result.message.offer.service.description = linkedService.description;
          if (linkedService.media) result.result.message.offer.service.media = linkedService.media[0];
          if (linkedService.prices && linkedService.prices[0]) result.result.message.offer.service.price = linkedService.prices[0];
          const linkedSeller = await findOneUser({
            _id: linkedService.userId
          });
          if (linkedSeller) {
            result.result.message.offer.service.seller = {
              firstName: linkedSeller.firstName,
              lastName: linkedSeller.lastName
            };
          }

          //if offer has no media, then populate offer image from linked service or seller
          if ((!offer.media || offer.media.length < 1) && offer.serviceId) {
            if (linkedService.media && linkedService.media.length > 0) {
              result.result.message.offer.media = linkedService.media[0];
            } else {
              result.result.message.offer.media = linkedSeller.profilePic;
            }
          }
        }
      }
    }
  }

  //populate result with request
  if (newMessage.requestId) {
    result.result.message.request = {};
    result.result.message.request.requestId = newMessage.requestId;
    const request = await findOneRequest({
      _id: newMessage.requestId
    });
    if (request) {
      result.result.message.request.description = request.description;
      if (request.media && request.media.length > 0) result.result.message.request.media = request.media[0];
      result.result.message.request.currencyCode = request.currencyCode;
      result.result.message.request.currencySymbol = request.currencySymbol;
      result.result.message.request.minPrice = request.minPrice;
      result.result.message.request.maxPrice = request.maxPrice;
      result.result.message.request.scheduleDate = request.scheduleDate;
    }
  }

  const msg = {
    message: {
      notification: {
        title: 'Tom Hanks',
        body: 'Are you available to do this job on Sat?'
      },
      token: "da92IL0aoIA:APA91bG2gOKpgjyTA7DAXUWvCyn19GYC7tYE21Kvocliv2w6z0gcqnCmICpFlMhJAG0C8R91biCk7lc5ikBFrf1p7AzWWvpPfWt1WwnJtaoHsE8XUcuwxSpqeCI8LILbqgcVfl5XloCA"
    }
  };
  notification.sendNotification(msg);
  //send message to conversation room
  return socket.to(message.conversationId).emit("message", result);

}
