const { delete: deleteWatch } = require('../../../stores/service-watch');
const { findOne: findOneWatch } = require('../../../stores/service-watch');
const { findOne: findOneService } = require('../../../stores/service');

const errorMessage = 'Service does not exists';
module.exports = async (ctx) => {
    const service = await findOneService({ _id: ctx.params.idService });

    if (!service || service.error) ctx.throw(404, errorMessage);

    const watch = await findOneWatch({ userId: ctx.queryToFindUserById._id, serviceId: ctx.params.idService });

    if (!watch || watch.error) {
        ctx.status=404;
        ctx.body={ watched:false, message:"watch does not exist" };
    } else {
      await deleteWatch({ userId: ctx.queryToFindUserById._id, serviceId: ctx.params.idService} );

      const watchDoc = await findOneService( { userId: ctx.queryToFindUserById._id, serviceId: ctx.params.idService} );

      if(!watchDoc || watchDoc.error) ctx.body = { watched: false, message: "successfully deleted watch" };
      else {
        ctx.status=500;
        ctx.body = { watched: true, message: "technical error in delete watch" };
      }
    }
};
