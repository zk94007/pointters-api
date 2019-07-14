const Promise = require('bluebird');
const { map } = require('lodash');
const { findOne, create } = require('../../../stores/conversation');
const { findOne: findOneUser } = require('../../../stores/user');
const { Types:{ObjectId} } = require('../../../databases/mongo');
const IO = require('koa-socket.io');

//socket'io listener cb
//register it in /lib/socket.js
module.exports =  async (d, socket)=>{
    const users = (typeof d === 'string')?JSON.parse(d).users:d.users;
    if(!(Array.isArray(users) && users.length>=2))
        return socket.emit("start_conversation",{error: "invalid users"});

    //get user names
    const user1 = await findOneUser({ _id: ObjectId(users[0]) });
    const user2 = await findOneUser({ _id: ObjectId(users[1]) });
    if(!user1 || !user2)
      return socket.emit("start_conversation",{error: "invalid users"});

    if(users.length == 2) {
        const conversation = await findOne({$or:[{ users: [users[0], users[1]] }, { users: [users[1], users[0]] }]} );
        if(conversation) {
            socket.join(conversation._id, async () => {
                let rooms = Object.keys(socket.rooms);
            });
            return socket.emit("start_conversation",{conversationId:conversation._id});
        }
    }

    const conversationTitle = user1.firstName + " " + user1.lastName + ", " + user2.firstName + " " + user2.lastName;
    //create new conversation
    const newConversation = await create({ conversationTitle, users });
    if (!newConversation || newConversation.error){
        return socket.emit("start_conversation","Error conversation create");
    }

    //socket.join room
    socket.join(newConversation._id, async () => {
        let rooms = Object.keys(socket.rooms);
    });

    return socket.emit("start_conversation",{conversationId:newConversation._id});

  }
