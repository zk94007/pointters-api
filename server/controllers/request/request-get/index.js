const { find: findRequest, count } = require('../../../../stores/request');
const { findOne: findService } = require('../../../../stores/service');
const { count:numOrders } = require('../../../../stores/order');
const { avgRating } = require('../../../../stores/service-review');
const { count: countShares } = require('../../../../stores/service-share');

const {pagination:{requests:limit}} = require('../../../../config');
const {Types:{ObjectId}} = require('../../../../databases/mongo');
const getQuery = require('./get-query');
const errorMessage = 'Request does not exists';

module.exports = async(ctx) => {
    const query = getQuery(ctx);
    const requests = await findRequest(query, {limit});
    if (!requests || !requests.length || requests.error) ctx.throw(404, errorMessage);
    if (ctx.params.idRequest) {
      if(requests[0].serviceId){
        const foundService = await findService({_id:requests[0].serviceId});
        if(!foundService || foundService.error) ctx.throw(404, 'service not found');
        else {
          requests[0].service = foundService;
          requests[0].service.numOrders = await numOrders({serviceId:ObjectId(requests[0].serviceId)});
          requests[0].service.avgRating = await avgRating({serviceId:ObjectId(requests[0].serviceId)});
          requests[0].service.pointValue = await countShares({serviceId:ObjectId(requests[0].serviceId)});
        }
      }

      ctx.body = requests[0];
      return;
    } else {
      ctx.body = requests;
    }

    const lastOne = requests[requests.length - 1];
    const remaining = await count({_id:{$gt: ObjectId(lastOne._id)}});
    if (remaining) ctx.body.next = `${ctx.url}?id_gt=${lastOne._id}`;
};
