const Promise = require('bluebird');
const { map } = require('lodash');
const { findOne, create } = require('../../../stores/conversation');
const { Types:{ObjectId} } = require('../../../databases/mongo');

module.exports = async (ctx) => {
	const users = ctx.request.body.users;
    if(!users){
        ctx.throw(404, "No find Users");
    }
    if(typeof users === 'string')
        ctx.throw(404, "Please input more 2 users");
    if(users.length == 2) {
        const conversation = await findOne({ users: [users[0], users[1]] } );
        if(conversation)
            ctx.throw(400, "conversation" + conversation._id + " already exists" );
    }
    const newConversation = await create(ctx.request.body);
    if (!newConversation || newConversation.error)
        ctx.throw(404, "Error conversation create");

    ctx.status = 200;
    ctx.body = { newConversation };

};
