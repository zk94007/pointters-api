const ratelimit = require('koa-simple-ratelimit');
const redis = require('redis');


const {
    redis:{
        url
    },
    rateLimitCalls:{
        duration,
        max,
        blacklist,
        whitelist
    }
} = require('../../../config');
module.exports = () => ratelimit({
    db: redis.createClient(url),
    id: (ctx) => ctx.ip,
    duration,
    max,
    blacklist,
    whitelist,
});
