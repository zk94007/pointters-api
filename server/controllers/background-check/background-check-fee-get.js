const { findOne: findOneCheckr } = require('../../../stores/background-report');
const { findOne: findCandidate } = require('../../../stores/background-candidate');

const errorInGet = 'Error in getting background check';
module.exports = async (ctx) => {
  ctx.status = 200;
  ctx.body = {
    transactionFee: 25,
    currencyCode: 'USD'
  };
};
