const Promise = require('bluebird');
const { map } = require('lodash');
const { paginate, count } = require('../../../stores/order');
const {Types:{ObjectId}} = require('../../../databases/mongo');
const { findOne: findOneUser } = require('../../../stores/user');
const { findOne: findService } = require('../../../stores/service');

module.exports = async (ctx) => {
    ctx.status = 200;
    const result = {
      taxPercent: 0.05,
      taxAmount: 5,
      currencyCode: 'USD'
    };
    ctx.body = result;
};
