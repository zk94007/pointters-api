const { delete: deleteFlagInappropriate } = require('../../../stores/service-flag-inappropriate');
const { findOne: findOneFlagInappropriate } = require('../../../stores/service-flag-inappropriate');
const { findOne: findOneService } = require('../../../stores/service');

const errorMessage = 'Service does not exists';
module.exports = async (ctx) => {
    const service = await findOneService({ _id: ctx.params.idService });

    if (!service || service.error) ctx.throw(404, errorMessage);

    const flagInappropriate = await findOneFlagInappropriate({ userId: ctx.queryToFindUserById._id, serviceId: ctx.params.idService });

    if (!flagInappropriate || flagInappropriate.error) {
        ctx.status=404;
        ctx.body={ flagInappropriate:false, message:"flagInappropriate does not exist" };
    } else {
      await deleteFlagInappropriate({ userId: ctx.queryToFindUserById._id, serviceId: ctx.params.idService} );

      const flagInappropriateDoc = await findOneService( { userId: ctx.queryToFindUserById._id, serviceId: ctx.params.idService} );

      if(!flagInappropriateDoc || flagInappropriateDoc.error) ctx.body = { flagInappropriate: false, message: "successfully deleted flagInappropriate" };
      else {
        ctx.status=500;
        ctx.body = { flagInappropriate: true, message: "technical error in delete flagInappropriate" };
      }
    }
};
