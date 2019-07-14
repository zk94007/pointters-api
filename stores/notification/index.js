const client = require('./client');
const count = require('./count');
const create = require('./create');
const Delete = require('./delete');
const find = require('./find');
const findOne = require('./find-one');
const paginate = require('./paginate');
const remove = require('./remove');
const search = require('./search');
const updateIfExistsAndCreateIfNot = require('./update-if-exists-create-if-not');
const update = require('./update');
const unset = require('./unset');

module.exports = {
    count: count(client),
    create: create(client),
    delete: Delete(client),
    find: find(client),
    findOne: findOne(client),
    paginate: paginate(client),
    remove: remove(client),
    search: search(client),
    updateIfExistsAndCreateIfNot: updateIfExistsAndCreateIfNot(client),
    update: update(client),
    unset: unset(client)
};
