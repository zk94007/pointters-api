const subschemas = require('./sub-schema');
const {Schema} = require('mongoose');
module.exports = {
    createdAt: {
        type: Date,
        default: new Date()
    },
    buyerId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'user'
    },
    buyerOrderDispute: Object,
    buyerServiceLocation: subschemas.location.schema ,
    cancellationDate: Date,
    category: {
        type: Object,
        required: true
    },
    currencyCode: {
        type: String,
        required: true
    },
    currencySymbol: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    fulfillmentMethod: {
      type: subschemas.fulfillmentMethod.schema,
      required: true
    },
    geofence: Array,
    isActive: {
        type: Boolean,
        default: true
    },
    offerId: {
        type: Schema.Types.ObjectId,
        index: true,
        ref: 'offer'
    },
    onTime: {
        type: Number,
        enum: [ 0, 1 ]
    },
    orderAcceptanceDate: Date,
    orderItems: {
      type: [ subschemas.item.schema ],
      required: true
    },
    orderMilestoneStatuses: subschemas.milestoneStatus.schema,
    paymentDate: Date,
    paymentMethod: {
        type: Object,
        required: true
    },
    requestOfferId: {
        type: Schema.Types.ObjectId,
        index: true,
        ref: 'request-offer'
    },
    sellerAcceptedScheduleTime: Boolean,
    sellerAcceptedScheduleTimeDate: Date,
    sellerAcceptedBuyerServiceLocation: Boolean,
    sellerAcceptedBuyerServiceLocationDate: Date,
    sellerAcceptedBuyerDispute: Boolean,
    sellerAcceptedBuyerDisputeDate: Date,
    sellerDeliveredMedia: [ subschemas.media.schema ],
    sellerId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'user'
    },
    sellerServiceLocation: [ subschemas.location.schema ],
    serviceId: {
        type: Schema.Types.ObjectId,
        index: true,
        ref: 'service'
    },
    servicesPrices: [ subschemas.price.schema ],
    serviceCompleteDate: Date,
    serviceScheduleDate: Date,
    serviceScheduleEndDate: Date,
    serviceStartDate: Date,
    shipmentId: {
      type:Schema.Types.ObjectId,
      ref: 'shipment'
    },
    shippingFee: Number,
    shippingInfo: Object,
    taxes: Object,
    taxAmount: Number,
    totalAmount: {
      type: Number,
      required: true
    },
    totalAmountBeforeDiscount: Number,
    totalWorkDurationHours: {
        type: Number,
        required: true
    },
    transactionFee: {
      type: Number,
      required: true
    },
    transactionDate: {
      type: Date,
      required: true
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
    shareLink: {
        type: String
    }
};
