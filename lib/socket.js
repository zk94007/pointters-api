const IO = require('koa-socket.io');
const io = new IO({ namespace: '/' });
const options = {};
const conversationHandler = require('../server/controllers/conversation/conversation-socket');
const messageHandler = require('../server/controllers/message/message-socket');
const {requestJoinRoom,liveOffer} = require('../server/controllers/request/socket');
const jwt = require('jsonwebtoken');
const { jwt: { expiresIn, secret } } = require('../config');

module.exports = (server) => {
  io.start(server, options);

  io.socket.sockets.use((socket, next) => {
    const token = socket.handshake.query.token;
    jwt.verify(token, secret, function(err, decoded) {
      if(err) return next(new Error('Authentication error'));
      else {
        //console.log('userId = ',decoded.id);
        //console.log('socket.id = ',socket.id);
        return next();
      }
    });
  });

  io.socket.sockets.on('connect', async (socket)=>{
    socket.on('start_conversation', async (data)=>{
      await conversationHandler(data, socket);
    });

    socket.on('message', async (data)=>{
      await messageHandler(data, socket);
    });

    socket.on('disconnect', async (data)=>{
      //console.log('disconnect 1');
    });

    socket.on('join_live_offer_room', async (data)=>{
      await requestJoinRoom(data, socket);
    });

    socket.on('live_offer', async (data)=>{
      await liveOffer(data, socket);
    });
  });


}
