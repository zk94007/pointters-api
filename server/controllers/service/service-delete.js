const { remove } = require('../../../stores/service');

module.exports = async(ctx) => {
    const queryToFindService = { _id: ctx.params.idService };

    const removed = await remove(queryToFindService);
    console.log('removed ', removed);
    if (!removed || removed.error) ctx.throw(404);

    ctx.body = { success: true };
};
