const { remove: removeOffer } = require('../../../stores/request-offer');

const errorMessage = 'Request does not exists';
module.exports = async(ctx) => {
    const requestRemoved = await removeOffer({ _id: ctx.params.idOffer });
    if (!requestRemoved || requestRemoved.error) ctx.throw(404, errorMessage);

    const removed = requestRemoved.isActive?false:true;
    ctx.body = { success: removed };
};
