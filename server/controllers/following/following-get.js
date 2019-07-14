const { findOne } = require('../../../stores/following');

const errorMessage = 'Error in find following';

module.exports = async(ctx) => {
    const queryToFindService = { _id: ctx.params.idfollowing };

    const following = await findOne(queryToFindService);

    if (!following || following.error) ctx.throw(404, errorMessage);

    ctx.body = { following };
};
