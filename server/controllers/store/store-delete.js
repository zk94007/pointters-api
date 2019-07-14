const { remove } = require('../../../stores/store');

const errorMessage = 'Store does not exists';
module.exports = async(ctx) => {
    const docRemoved = await remove({ _id: ctx.params.idStore });
    if (!docRemoved || docRemoved.error) ctx.throw(404, errorMessage);

    ctx.body = { success: true };
};
