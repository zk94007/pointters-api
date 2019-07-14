module.exports = (ctx) => {
    const update = {};
    if (ctx.request.body.keywords) update.$addToSet = {
        keywords:{$each:ctx.request.body.keywords}
    };
    if (ctx.request.body.name) update.name = ctx.request.body.name;
    return update;
};
