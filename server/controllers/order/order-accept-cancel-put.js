const { update: updateOrder } = require('../../../stores/order');

module.exports = async (ctx) => {
    const orderToupdate = {
      sellerAcceptedBuyerDispute:true,
      sellerAcceptedBuyerDisputeDate: new Date()
    };
    const { error } = await updateOrder({ _id: ctx.params.idOrder }, orderToupdate);

    if (error) ctx.throw(404, error.message);

    ctx.body = { success: true };
};
