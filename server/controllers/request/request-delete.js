const { remove: removeRequest } = require('../../../stores/request');

const errorMessage = 'Request does not exists';
module.exports = async(ctx) => {
    const requestRemoved = await removeRequest({ _id: ctx.params.idRequest });
    if (!requestRemoved || requestRemoved.error) ctx.throw(404, errorMessage);

    ctx.body = { success: true };
};
