module.exports = (ctx) => {
    const query = {};
    query._id = ctx.params.idCategory;
    return query;
};
