const { delete: deleteFollowing, findOne } = require('../../../stores/following');

module.exports = async(ctx) => {
    const queryToFindService = { _id: ctx.params.idfollowing };
    const follow = await findOne(queryToFindService);
    if(!follow || follow.error) ctx.throw(404, "Following dose not exist");
    await deleteFollowing(queryToFindService);
    const following = await findOne(queryToFindService);
    if (following)
    	ctx.body = { success: false };
    else
    	ctx.body = { success: true };
};
