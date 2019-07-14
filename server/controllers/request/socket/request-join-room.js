const Promise = require('bluebird');
const { map } = require('lodash');
const { findOne:findRequest } = require('../../../../stores/request');
const { Types:{ObjectId} } = require('../../../../databases/mongo');
const IO = require('koa-socket.io');

module.exports =  async (d, socket)=>{
  const requestId = (typeof d === 'string')?JSON.parse(d).requestId:d.requestId;
  if(!requestId) return socket.emit("error",{error: "invalid requestId"});

  const request = await findRequest({_id:ObjectId(requestId)});
  if(!request || request.error) return socket.emit("error",{error: "invalid requestId"});

  //socket.join room
  socket.join(requestId, async () => {
      let rooms = Object.keys(socket.rooms);
  });

  return socket.emit("join_live_offer_room",{requestId:requestId,message:'successfully joined request room'});
}
