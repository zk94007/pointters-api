const { findOne } = require('../../../stores/service-watch');
const { findOne: findOneService } = require('../../../stores/service');

const errorMessage = 'Watch does not exists';
const technicalError = 'Technical error';

module.exports = async(ctx) => {
    const service = await findOneService({ _id: ctx.params.idService });
    if (!service || service.error) ctx.throw(404, errorMessage);

    const watched = await findOne({ userId: ctx.queryToFindUserById._id, serviceId: ctx.params.idService });

    if (watched && watched.error) ctx.throw(500, technicalError);
    else {
      if (!watched) ctx.body = { watched:false };
  		else ctx.body = { watched:true };
    }
};
