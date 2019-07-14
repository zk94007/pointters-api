const client = require('../../../services/tax');
const countries = require("i18n-iso-countries");
const usStateCodes = require('us-state-codes');
const errorMsg = 'Error in calculating sales tax';

module.exports = async(ctx) => {
  if (!ctx.request.body.to_country && !ctx.request.body.to_country_name) ctx.throw(404, 'Missing to country');
  if (!ctx.request.body.to_state && !ctx.request.body.to_state_name) ctx.throw(404, 'Missing to state');

  let taxJarRequestBody = {
    amount: ctx.request.body.amount,
    shipping: ctx.request.body.shipping
  };
  if(ctx.request.body.from_zip) taxJarRequestBody.from_zip = ctx.request.body.from_zip;
  if(ctx.request.body.from_city) taxJarRequestBody.from_city = ctx.request.body.from_city;
  if(ctx.request.body.from_street) taxJarRequestBody.from_street = ctx.request.body.from_street;
  if(ctx.request.body.to_street) taxJarRequestBody.to_street = ctx.request.body.to_street;
  if(ctx.request.body.to_zip) taxJarRequestBody.to_zip = ctx.request.body.to_zip;
  if(ctx.request.body.to_city) taxJarRequestBody.to_city = ctx.request.body.to_city;

  if(ctx.request.body.from_country) {
    taxJarRequestBody.from_country= ctx.request.body.from_country;
  } else {
    taxJarRequestBody.from_country = await countries.getAlpha2Code(ctx.request.body.from_country_name, 'en');
  };
  if(ctx.request.body.to_country) {
    taxJarRequestBody.to_country = ctx.request.body.to_country;
  } else {
    taxJarRequestBody.to_country = await countries.getAlpha2Code(ctx.request.body.to_country_name, 'en');
  }

  if(ctx.request.body.from_state) {
    taxJarRequestBody.from_state= ctx.request.body.from_state;
  } else {
    taxJarRequestBody.from_state = await usStateCodes.getStateCodeByStateName(ctx.request.body.from_state_name);
  };
  if(ctx.request.body.to_state) {
    taxJarRequestBody.to_state = ctx.request.body.to_state;
  } else {
    taxJarRequestBody.to_state = await usStateCodes.getStateCodeByStateName(ctx.request.body.to_state_name);
  }

  console.log(taxJarRequestBody);
  const doc = await client.taxForOrder(taxJarRequestBody);

  if (!doc || doc.error) ctx.throw(404, errorMsg);
  ctx.body = doc;

};
