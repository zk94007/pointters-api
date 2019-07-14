const { findOne: findOneFlagInappropriate } = require('../../../stores/service-flag-inappropriate');
const { findOne: findOneService } = require('../../../stores/service');

const errorMessage = 'Watch does not exists';
const technicalError = 'Technical error';

module.exports = async(ctx) => {
    const service = await findOneService({ _id: ctx.params.idService });
    if (!service || service.error) ctx.throw(404, errorMessage);

    const flagInappropriate = await findOneFlagInappropriate({ userId: ctx.queryToFindUserById._id, serviceId: ctx.params.idService });

    if (flagInappropriate && flagInappropriate.error) ctx.throw(500, technicalError);
    else {
      if (!flagInappropriate) ctx.body = { flagInappropriate:false };
  		else ctx.body = { flagInappropriate:true };
    }
};
