const { findOne: findOneOrder } = require('../../../stores/order');
const { paginate: paginateStores } = require('../../../stores/store');
const { findOne: findReview } = require('../../../stores/service-review');
const { findOne: findShipment } = require('../../../stores/shipment');
const {Types:{ObjectId}} = require('../../../databases/mongo');
const errorInGetWatching = 'Error in get to order';
const orderDoesNotExists = 'Error in get to order';

module.exports = async (ctx) => {
    const queryToFindOrder = { _id: ctx.params.idOrder };
    const order = await findOneOrder(queryToFindOrder);

    const review = await findReview({orderId:ObjectId(ctx.params.idOrder)});
    if(review && !review.error) order.review = review;

    if(order.shipmentId){
      const shipment = await findShipment({_id:ObjectId(order.shipmentId)});
      if(shipment && !shipment.error) order.shipment = shipment;
    }

    if (!order) ctx.throw(403, orderDoesNotExists);
    if (!order || order.error) ctx.throw(404, errorInGetWatching);

    ctx.body = { order };
};
