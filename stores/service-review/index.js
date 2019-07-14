const client = require('./client');
const findOne = require('./find-one');
const find = require('./find');
const create = require('./create');
const remove = require('./remove');
const updateIfExistsAndCreateIfNot = require('./update-if-exists-create-if-not');
const update = require('./update');
const count = require('./count');
const search = require('./search');
const unset = require('./unset');
const avgRating = require('./avgRating');
const avgQuality  = require('./avgQuality');
const paginate = require('./paginate');

module.exports = {
    unset: unset(client),
    unset: unset(client),
    avgRating: avgRating(client),
    avgQuality: avgQuality(client),
    find: find(client),
    findOne: findOne(client),
    count: count(client),
    create: create(client),
    search: search(client),
    update: update(client),
    remove: remove(client),
    paginate: paginate(client),
    updateIfExistsAndCreateIfNot: updateIfExistsAndCreateIfNot(client)
};
