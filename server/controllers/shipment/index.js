module.exports = {
    deleteShipment: require('./shipment-delete'),
    deleteShipmentParcel: require('./shipment-parcel-delete'),
    deleteShipmentToAddress: require('./shipment-to-address-delete'),
    getShipment: require('./shipment-get'),
    getShipmentLabel:require('./shipment-label-get'),
    getShipmentParcel: require('./shipment-parcel-get'),
    getShipmentRates:require('./shipment-rates-get'),
    getShipmentToAddress: require('./shipment-to-address-get'),
    postBuyShipment: require('./shipment-buy-post'),
    postShipment: require('./shipment-post'),
    postShipmentParcel: require('./shipment-parcel-post'),
    postShipmentToAddress: require('./shipment-to-address-post'),
    putShipment: require('./shipment-put'),
    putShipmentParcel: require('./shipment-parcel-put'),
    putShipmentToAddress: require('./shipment-to-address-put')
};
