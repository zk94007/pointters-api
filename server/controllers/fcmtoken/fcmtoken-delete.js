const { remove: removeToken } = require('../../../stores/fcm-token');
const {Types:{ObjectId}} = require('../../../databases/mongo');

const errorMessage = 'token does not exists';

module.exports = async(ctx) => {

    const tokenRemoved = await removeToken({userId:ctx.state.user.id},{tokenItems:ctx.request.body});

    console.log("Removed============", tokenRemoved);

    if (!tokenRemoved || tokenRemoved.error) ctx.throw(404, errorMessage);

    ctx.body = { success: true, tokenRemoved };
};
