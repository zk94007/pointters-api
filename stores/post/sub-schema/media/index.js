const schema = require('./schema');
const get = require('./get-media');
const put = require('./put-to-media');
const pull = require('./pull-to-media');
const push = require('./push-to-media');


module.exports = {
    schema,
    methods:(client) => ({
        get: get(client),
        put: put(client),
        pull: pull(client),
        push: push(client),
    })
};
