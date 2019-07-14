const {Schema} = require('mongoose');
const {
    address:{
        schema: addressSchema
    },
    item:{
        schema: itemSchema
    },
    parcel:{
        schema: parcelSchema
    }
} = require('./sub-schemas');

module.exports = {
    amount: Number,
    batchId: String,
    batchDtatus: String,
    batchMessage: String,
    buyerAddress: addressSchema,
    carrier: String,
    contentsType: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
    customsCertify	: Boolean,
    customsSigner: String,
    eelPfc: String,
    externalId:String,
    fees: [],
    forms: [],
    fromAddress: addressSchema,
    insurance: String,
    isActive: {
        type: Boolean,
        default: true
    },
    isReturn: Boolean,
    items:[ itemSchema ],
    label: String,
    messages: [],
    mode: String,
    options: {
        currency: String,
        labelDate: String,
        dateAdvance: Number
    },
    orderId: String,
    parcel:parcelSchema,
    postageLabel: {
        externalId: String,
        integrated_form: String,
        labelDate: Date,
        labelEpl2Url: String,
        labelFileType: String,
        labelPdfUrl: String,
        labelResolution: Number,
        labelSize: String,
        labelType: String,
        labelUrl: String,
        labelZplUrl: String,
    },
    rates:[
        {
            carrier: String,
            carrierAccountId: String,
            currency: String,
            deliveryDays: Number,
            deliveryDate: String,
            deliveryDateGuaranteed: Boolean,
            estDeliveryDays: Number,
            listRate: String,
            listCurrency: String,
            rate: String,
            retailRate: String,
            retailCurrency: String,
            service: String,
            shipmentDd: String
        }
    ],
    reference: String,
    refundStatus: String,
    restrictionType: String,
    returnAddress:addressSchema,
    scanForm: String,
    selectedRate: Object,
    shipFromAddressId: {
      type:Schema.Types.ObjectId,
      ref: 'shipment-address'
    },
    shipToAddressId: {
      type:Schema.Types.ObjectId,
      ref: 'shipment-address'
    },
    status: String,
    toAddress: addressSchema,
    tracker: String,
    trackingCode: String,
    updatedAt: {
        type: Date,
        default: new Date()
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'user'
    },
    uspsZone: Number
};
