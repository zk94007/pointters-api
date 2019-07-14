const schema = require('./schema');
const get = require('./get-sub-category');
const put = require('./put-to-sub-category');
const pull = require('./pull-to-sub-category');
const push = require('./push-to-sub-category');


module.exports = {
    schema,
    methods:(client) => ({
        get: get(client),
        put: put(client),
        pull: pull(client),
        push: push(client),
    })
};
