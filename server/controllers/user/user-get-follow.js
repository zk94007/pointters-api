const { findOne: findFollowing } = require('../../../stores/following');
const { findOne: findOneUser } = require('../../../stores/user');
const errorMessage = 'Invalid followedId';
const technicalError = 'Technical error';

module.exports = async(ctx) => {
    const user = await findOneUser({ _id: ctx.params.followedId });
    if (!user || user.error) ctx.throw(404, errorMessage);

    const query = {
      followFrom: ctx.queryToFindUserById._id,
      followTo: ctx.params.followedId
    };
    const following = await findFollowing(query);

    if (following && following.error) ctx.throw(500, technicalError);
    else {
      if (!following) ctx.body = { followed:false };
      else ctx.body = { followed:true };
    }
};
