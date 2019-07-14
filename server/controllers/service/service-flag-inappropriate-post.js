const { create: createFlagInappropriate } = require('../../../stores/service-flag-inappropriate');
const { findOne: findOneFlagInappropriate } = require('../../../stores/service-flag-inappropriate');
const { findOne: findOneService } = require('../../../stores/service');

const errorMessage = 'Service does not exists';
module.exports = async(ctx) => {
    if (!ctx.request.body.comment) ctx.throw(400, "Comment required to flag inappropriate");

    const service = await findOneService({ _id: ctx.params.idService });
    if (!service || service.error) ctx.throw(404, errorMessage);

    const flagInappropriateDoc = {
      userId: ctx.queryToFindUserById._id,
      serviceId: ctx.params.idService,
      comment: ctx.request.body.comment};

    const flagInappropriate = await findOneFlagInappropriate(flagInappropriateDoc);

    if (flagInappropriate && !flagInappropriate.error) {
      ctx.status=409;
      ctx.body={ flagInappropriate:true, message:"cannot POST because flagInappropriate already does exists" };
    } else {
      const flagInappropriateCreate = await createFlagInappropriate(flagInappropriateDoc);

      if (flagInappropriateCreate && !flagInappropriateCreate.error)
        ctx.body = { flagInappropriate: true, message: "successfully flag inappropriate" };
      else {
        ctx.status = 500;
        ctx.body = { flagInappropriate: false, message: "technical error in flag inappropriate" };
      }
    }
};
