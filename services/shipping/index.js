const saveAddress = require('./save-address');
const saveParcel = require('./save-parcel');
const saveShipment = require('./save-shipment');
const buy = require('./buy');
const getLabel = require('./get-label');
const getRates = require('./get-rates');

module.exports = {
    address:{
        save:saveAddress
    },
    parcel:{
        save:saveParcel
    },
    shipment:{
        save:saveShipment
    },
    buy,
    getLabel,
    getRates
};
