const { findOne } = require('../../../stores/user');
const { filterKeysOfUserByRequester } = require('../../../stores/user/privacity');

module.exports = async(ctx) => {
    const queryToGetRequester = ctx.queryToFindUserById;
    const queryToGetOtherUser = {
        _id: ctx.request.query.userId || ctx.queryToFindUserById._id
    };
    const requester = await findOne(queryToGetRequester);

    if (!requester || requester.error) ctx.throw(404, 'Requester not found');

    if (!ctx.request.query.userId || ctx.request.query.userId === ctx.state.user.id) {
        delete requester.password;
        ctx.body = { user: requester };
        return;
    }
    const otherUser = await findOne(queryToGetOtherUser);

    if (!otherUser || otherUser.error) ctx.throw(404, 'User not found');

    const userFilter = filterKeysOfUserByRequester(otherUser, requester);
    ctx.body = { user: userFilter };
};
