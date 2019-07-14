module.exports = (ctx) => {
    const query = {};
    query._id = ctx.params.idShipment;
    return query;
};
