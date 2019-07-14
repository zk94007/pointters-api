const mongo = require('mongoose');

module.exports = () => ({
    buyerId: mongo.Types.ObjectId(),
    buyerOrderDispute: {},
    buyerServiceLocation: {
        city: 'String',
        country: 'String',
        geoJson: {
            type: 'Point',
            coordinates: [ 12.123456, 13.134578 ]
        },
        postalCode: 'String',
        province: 'String',
        state: 'String'
    },
    cancellationDate: new Date(),
    category: {},
    description: 'to 11/20 8PM for dog walk service',
    ulfillmentMethod: {
        local: true,
        online: true,
        shipment: true,
        store: true
    },
    geofence: [],
    orderAcceptanceDate: new Date(),
    orderItems: [ {
        description: 'description',
        price: 1,
        quantity: 1,
        time: 1,
        timeUnitOfMeasure: 'hour'
    } ],
    orderMilestoneStatuses: {
        accepted: true,
        acceptedDate: new Date(),
        completed: true,
        completedDate: new Date(),
        paid: true,
        paidDate: new Date(),
        scheduled: true,
        scheduledDate: new Date(),
        started: true,
        startedDate: new Date()
    },
    paymentDate: new Date(),
    paymentMethod: {},
    servicesPrices: [ {
        description: 'description',
        location: {},
        price: 1,
        time: 1,
        timeUnitOfMeasure: 'hour'
    } ],
    transactionFee: 1,
    transactionDate: new Date(),
    sellerAcceptedScheduleTime: true,
    sellerAcceptedBuyerServiceLocation: true,
    sellerDeliveredMedia: [ {
        fileName: 'string',
        mediaType: 'image'
    } ],
    sellerId: mongo.Types.ObjectId(),
    sellerServiceLocation: [ {
        city: 'String',
        country: 'String',
        geoJson: {
            type: 'Point',
            coordinates: [ 12.123456, 13.134578 ]
        },
        postalCode: 'String',
        province: 'String',
        state: 'String'
    } ],
    serviceScheduleDate: new Date(),
    serviceStartDate: new Date(),
    serviceCompleteDate: new Date(),
    shippingInfo: {},
    taxes: {},
    currencyCode: 'String',
    serviceId: mongo.Types.ObjectId(),
    totalWorkDurationHours: new Number()
});
