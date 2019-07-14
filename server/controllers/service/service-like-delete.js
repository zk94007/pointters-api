const { findOne: findOnelike, delete: deleteWatch } = require('../../../stores/service-like');
const { findOne: findOneService } = require('../../../stores/service');

const errorMessage = 'Service does not exists';
module.exports = async (ctx) => {
    const service = await findOneService({ _id: ctx.params.idService });

    if (!service || service.error) ctx.throw(404, errorMessage);

    const like = await findOnelike({ userId: ctx.queryToFindUserById._id, serviceId: ctx.params.idService });

    if (!like || like.error) {
      ctx.status=404;
      ctx.body={ liked:false, message:"like does not exist" };
    } else {
      await deleteWatch({ userId: ctx.queryToFindUserById._id, serviceId: ctx.params.idService} );
      const likeDoc = await findOnelike( { userId: ctx.queryToFindUserById._id, serviceId: ctx.params.idService} );

      if(!likeDoc || likeDoc.error) ctx.body = { liked: false, message: "successfully deleted like" };
      else {
        ctx.status = 500;
        ctx.body = { liked: true, message: "technical error in delete like" };
      }
    }

};
