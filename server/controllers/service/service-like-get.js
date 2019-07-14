const { findOne: findOneLike } = require('../../../stores/service-like');
const { findOne: findOneService } = require('../../../stores/service');

const errorMessage = 'Service does not exists';
const technicalError = 'Technical error';

module.exports = async(ctx) => {
    const service = await findOneService({ _id: ctx.params.idService });

    if (!service || service.error) ctx.throw(404, errorMessage);

    const likes = await findOneLike({ userId: ctx.queryToFindUserById._id, serviceId: ctx.params.idService });

    if(likes && likes.error) ctx.throw(500, technicalError);
    else {
      if (!likes) ctx.body = { liked:false };
  		else ctx.body = { liked:true };
    }

};
