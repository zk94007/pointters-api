const { findOne } = require('../../../stores/service');

const errorMessage = 'Error in find service';

module.exports = async(ctx) => {
    const queryToFindService = { _id: ctx.params.idService, isActive: true };

    const service = await findOne(queryToFindService);

    if (!service || service.error) ctx.throw(404, errorMessage);

    ctx.body = { service };
};
