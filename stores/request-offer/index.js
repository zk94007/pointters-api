const client = require('./client');
const findOne = require('./find-one');
const findLastOne = require('./find-last-one');
const create = require('./create');
const remove = require('./remove');
const updateIfExistsAndCreateIfNot = require('./update-if-exists-create-if-not');
const update = require('./update');
const search = require('./search');
const find = require('./find');
const count = require('./count');
const paginate = require('./paginate');
const Delete = require('./delete');
const unset = require('./unset');

module.exports = {
    unset: unset(client),
    find: find(client),
    count: count(client),
    paginate: paginate(client),
    findOne: findOne(client),
    findLastOne: findLastOne(client),
    delete: Delete(client),
    search: search(client),
    create: create(client),
    update: update(client),
    remove: remove(client),
    updateIfExistsAndCreateIfNot: updateIfExistsAndCreateIfNot(client)
};
