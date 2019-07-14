module.exports = (ctx) => {
    const query = {userId: ctx.state.user.id};

    if (ctx.params.idShipment) query._id = ctx.params.idShipment;
    if (ctx.query.id_gt) query._id = {$gt: ctx.query.id_gt};

    return query;
};
