const { findOne: findOneUser } = require('../../../stores/user');
const { count } = require('../../../stores/service');
const countStore = require('../../../stores/store').count;
const countPayment = require('../../../stores/payment').count;

const errorMessage = 'Error in find user';

module.exports = async(ctx) => {
    const user = await findOneUser({ _id: ctx.queryToFindUserById._id });
    if (!user || user.error) ctx.throw(404, errorMessage);
    let result = {};
    result.paymentSetupStatus = await countPayment({ userId: ctx.queryToFindUserById._id, isActive: true }) > 0 ? 'Done': 'Not Started';
    result.numServices = await count({ userId: ctx.queryToFindUserById._id, isActive: true });
    result.backgroundCheckStatus = user.isVerified ? 'Done':'Not Started';
    result.numStores = await countStore({ userId: ctx.queryToFindUserById._id, isActive: true });

    ctx.status = 200;
    ctx.body = result;
};
