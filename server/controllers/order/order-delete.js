const { remove: removeOrder } = require('../../../stores/order');

const errorMessage = 'Request does not exists';
module.exports = async(ctx) => {
    console.log('ctx.params.idOrder in delete', ctx.params.idOrder);
    const requestRemoved = await removeOrder({ _id: ctx.params.idOrder });
    console.log('requestRemoved', requestRemoved);
    if (!requestRemoved || requestRemoved.error) ctx.throw(404, errorMessage);

    ctx.body = { success: Boolean(requestRemoved.ok) };
};
