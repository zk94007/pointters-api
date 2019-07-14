const { findOne: findOneUser } = require('../../../stores/user');
const { findOne: findFollowing, delete: deleteFollowing } = require('../../../stores/following');
const checkIfIsValidId = require('../../lib/is-valid-id');
const idInvalidMessage = 'Invalid followedId';

module.exports = async(ctx) => {
    const isValidId = await checkIfIsValidId(ctx.params.followedId);
    if (!isValidId) return ctx.throw(404, idInvalidMessage);

    const userToUnfollow = await findOneUser({ _id: ctx.params.followedId });
    if (!userToUnfollow || userToUnfollow.error) return ctx.throw(404, idInvalidMessage);

    const query = {
      followFrom: ctx.queryToFindUserById._id,
      followTo: ctx.params.followedId
    };

    const followingBeforeDelete = await findFollowing(query);
    if (!followingBeforeDelete || followingBeforeDelete.error) {
        ctx.status=404;
        ctx.body={ followed:false, message:"cannot delete because follow does not exist" };
    } else {
        const followingDeleted = await deleteFollowing(query);
        const followingAfterDelete = await findFollowing(query);

        if (!followingAfterDelete || followingAfterDelete.error) {
          ctx.body = { followed:false, message:"successfully unfollowed" };
        } else {
          ctx.status=500;
        	ctx.body = { followed:true, message:"technical error in unfollow" };
    		}
    }
};
