const Promise = require('bluebird');
const { map } = require('lodash');
const { findOne, update } = require('../../../stores/conversation');
const { Types:{ObjectId} } = require('../../../databases/mongo');

module.exports = async (ctx) => {
    const users = ctx.request.body.users;
    if(!users){
        ctx.throw(404, "No find Users");
    }
    const conversation = await findOne({ _id: ctx.params.idConversation });
    if(!conversation)
        ctx.throw(404, "No find Conversation");
    const oldUsers = conversation.users.concat(users);
    const newConversation = await update({ _id: ctx.params.idConversation }, { users: oldUsers });
    if (!newConversation || newConversation.error)
        ctx.throw(404, "Error conversation Update");

    ctx.status = 200;
    ctx.body = { newConversation };

};
