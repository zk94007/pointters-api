const joi = require('joi');

const location = require('./location');
const item = require('./item');
const milestoneStatus = require('./milestone-status');
const media = require('./media');
const price = require('./price');
const fulfillmentMethod = require('./fulfillement-method');

module.exports = joi.object().keys({
    buyerId: joi.string().required(),
    buyerOrderDispute: joi.object(),
    buyerServiceLocation: location,
    cancellationDate: joi.date(),
    category: joi.object().required(),
    currencyCode: joi.string().required(),
    currencySymbol: joi.string().required(),
    description: joi.string(),
    fulfillmentMethod: fulfillmentMethod.required(),
    geofence: joi.array(),
    orderAcceptanceDate: joi.date(),
    orderItems: joi.array().items(item).required(),
    orderMilestoneStatuses: milestoneStatus,
    paymentDate: joi.date(),
    paymentMethod: joi.object().required(),
    servicesPrices: joi.array().items(price).required(),
    transactionFee: joi.number().required(),
    transactionDate: joi.date(),
    sellerAcceptedScheduleTime: joi.bool().default(false),
    sellerAcceptedBuyerServiceLocation: joi.bool().default(false),
    sellerDeliveredMedia: joi.array().items(media),
    sellerId: joi.string().required(),
    sellerServiceLocation: joi.array().items(location).required(),
    serviceScheduleDate: joi.date(),
    serviceScheduleEndDate: joi.date(),
    serviceStartDate: joi.date(),
    serviceCompleteDate: joi.date(),
    shipmentId: joi.string(),
    shippingInfo: joi.object(),
    taxes: joi.object(),
    totalAmount: joi.number().required(),
    totalAmountBeforeDiscount: joi.number()
});
