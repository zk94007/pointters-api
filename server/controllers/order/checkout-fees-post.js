const client = require('../../../services/tax');
const countries = require("i18n-iso-countries");
const usStateCodes = require('us-state-codes');
const taxErrorMsg = 'Error in calculating sales tax';

const {create: createShipment, findOne, update} = require('../../../stores/shipment');
const {shipment:{save: saveShipment}, getRates} = require('../../../services/shipping');

module.exports = async(ctx) => {
  let doc = {};
  let shipmentRates;

  if(!ctx.request.body.subtotal && !ctx.request.body.currencyCode) ctx.throw(404, 'Missing subtotal and currencyCode');
  doc.subtotal = ctx.request.body.subtotal;
  doc.transactionFee = ctx.request.body.subtotal * 0.05;

  /********************
  * Calculate shipping rates
  *******/
  if(ctx.request.body.shipmentId){
    const query = {
        _id: ctx.request.body.shipmentId,
    };
    const shipment = await findOne(query);
    if (!shipment || shipment.error) ctx.throw(404, 'shipment not found');
    if (!shipment.selectedRate) ctx.throw(404, 'shipment rate must be selected ahead of time to calculate tax');
    /*const shipmentToSend = Object.assign({}, shipment);
    if (shipmentToSend.items) {
        shipmentToSend.customsItems = shipmentToSend.items.map((item) => {
            delete item._id;
            return item;
        });
        delete shipmentToSend.items;
    }
    const id = shipmentToSend._id;
    delete shipmentToSend._id;
    delete shipmentToSend.userId;
    const saved = await getRates(shipmentToSend.externalId);
    if (!saved || saved.error) ctx.throw(404), 'Error with saving shipping rates';
    await update({_id:id}, saved);*/
    shipmentRates = {
      rates: shipment.rates,
      selectedRate: shipment.selectedRate
    };
  }

  /********************
  * Calculate tax
  *******/
  if (ctx.request.body.tax) {
    if (!ctx.request.body.tax.to_country && !ctx.request.body.tax.to_country_name) ctx.throw(404, 'Missing to country');
    if (!ctx.request.body.tax.to_state && !ctx.request.body.tax.to_state_name) ctx.throw(404, 'Missing to state');

    let taxJarRequestBody = {
      amount: doc.transactionFee + ctx.request.body.subtotal,
      shipping: 0
    };
    if(ctx.request.body.shipmentId && shipmentRates.selectedRate) {
      taxJarRequestBody.shipping = shipmentRates.selectedRate.rate;
      doc.shipping = shipmentRates.selectedRate.rate;
    }

    if(ctx.request.body.tax.from_zip) taxJarRequestBody.from_zip = ctx.request.body.tax.from_zip;
    if(ctx.request.body.tax.from_city) taxJarRequestBody.from_city = ctx.request.body.tax.from_city;
    if(ctx.request.body.tax.from_street) taxJarRequestBody.from_street = ctx.request.body.tax.from_street;
    if(ctx.request.body.tax.to_street) taxJarRequestBody.to_street = ctx.request.body.tax.to_street;
    if(ctx.request.body.tax.to_zip) taxJarRequestBody.to_zip = ctx.request.body.tax.to_zip;
    if(ctx.request.body.tax.to_city) taxJarRequestBody.to_city = ctx.request.body.tax.to_city;

    if(ctx.request.body.tax.from_country) {
      taxJarRequestBody.from_country= ctx.request.body.tax.from_country;
    } else {
      taxJarRequestBody.from_country = await countries.getAlpha2Code(ctx.request.body.tax.from_country_name, 'en');
    };
    if(ctx.request.body.tax.to_country) {
      taxJarRequestBody.to_country = ctx.request.body.tax.to_country;
    } else {
      taxJarRequestBody.to_country = await countries.getAlpha2Code(ctx.request.body.tax.to_country_name, 'en');
    }

    if(ctx.request.body.tax.from_state) {
      taxJarRequestBody.from_state= ctx.request.body.tax.from_state;
    } else {
      taxJarRequestBody.from_state = await usStateCodes.getStateCodeByStateName(ctx.request.body.tax.from_state_name);
    };
    if(ctx.request.body.tax.to_state) {
      taxJarRequestBody.to_state = ctx.request.body.tax.to_state;
    } else {
      taxJarRequestBody.to_state = await usStateCodes.getStateCodeByStateName(ctx.request.body.tax.to_state_name);
    }

    const taxResult = await client.taxForOrder(taxJarRequestBody);
    doc.tax = taxResult.tax;
  }

  if (!doc || doc.error) ctx.throw(404, taxErrorMsg);

  ctx.body = doc;

};
