const { update: updateOrder } = require('../../../stores/order');

module.exports = async (ctx) => {
    const orderToupdate = ctx.request.body;
    const { error } = await updateOrder({ _id: ctx.params.idOrder }, orderToupdate);

    if (error) ctx.throw(404, error.message);

    ctx.body = { success: true };
};
