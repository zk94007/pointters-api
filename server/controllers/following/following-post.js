const { create: createFollowing, findOne: findOnefollowing } = require('../../../stores/following');
const { findOne: findOneUser } = require('../../../stores/user');
const {  } = require('../../../stores/following');

module.exports = async (ctx) => {
	user = await findOneUser({ _id: ctx.params.idUser });

	if(!user || user.error) ctx.throw(404, "Error in find User");

	const follow = await findOnefollowing({ followTo: ctx.params.idUser, followFrom: ctx.queryToFindUserById._id });

	if(follow) ctx.throw(404, 'following already exist');

  const following = await createFollowing({ followTo: ctx.params.idUser, followFrom: ctx.queryToFindUserById._id });

  if (!following || following.error) ctx.throw(404, "Create Error");

  ctx.body = { success: true, following };
};
