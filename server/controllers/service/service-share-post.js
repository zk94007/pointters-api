const { findOne: findOneService } = require('../../../stores/service');
const { create: createShare } = require('../../../stores/service-share');

const errorMessage = 'Service does not exists';
const errorShareService = 'Technical error in sharing service';
module.exports = async(ctx) => {
    const serviceToShare = await findOneService({ _id: ctx.params.idService });

    if (!serviceToShare || serviceToShare.error) ctx.throw(404, errorMessage);

    const shareBody = {
      serviceId: ctx.params.idService,
      userId: ctx.queryToFindUserById._id
    };
    const serviceShared = await createShare(shareBody);

    if (serviceShared && serviceShared.error) ctx.throw(500, errorShareService);
    ctx.body = { share: serviceShared };
};
