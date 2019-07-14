module.exports = (ctx) => {
    //const query = {userId: ctx.state.user.id};
    const query = {isActive:true};

    if (ctx.params.idRequest) query._id = ctx.params.idRequest;
    if (ctx.query.id_gt) query._id = {$gt: ctx.query.id_gt};
    return query;
}
;
