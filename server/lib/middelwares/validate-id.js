module.exports = (id, ctx, next) => (async () => {
    if (id !== ctx.state.user.id) return ctx.throw(403, 'Unauthorized User');

    if (next) await next();
})();
