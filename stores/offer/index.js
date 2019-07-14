const client = require('./client');
const findOne = require('./find-one');
const create = require('./create');
const remove = require('./remove');
const updateIfExistsAndCreateIfNot = require('./update-if-exists-create-if-not');
const update = require('./update');
const find = require('./find');
const count = require('./count');
const search = require('./search');
const paginate = require('./paginate');
const Delete = require('./delete');
const unset = require('./unset');

module.exports = {
    unset: unset(client),
    paginate: paginate(client),
    findOne: findOne(client),
    delete: Delete(client),
    search: search(client),
    create: create(client),
    update: update(client),
    find: find(client),
    count: count(client),
    remove: remove(client),
    updateIfExistsAndCreateIfNot: updateIfExistsAndCreateIfNot(client)
};
