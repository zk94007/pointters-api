const debug = require('../../../lib/debug');

const { error: { stackTraceLimit } } = require('../../../config');

module.exports = () => async (ctx, next) => {
    Error.stackTraceLimit = stackTraceLimit;
    try {
        await next();
    } catch (err) {
        debug.api.error('Error catched: ', err);
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
            message: err.message
        };
    }
};
