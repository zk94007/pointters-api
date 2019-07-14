const client = require('./client');
const find = require('./find');
const findOne = require('./find-one');
const create = require('./create');
const remove = require('./remove');
const updateIfExistsAndCreateIfNot = require('./update-if-exists-create-if-not');
const update = require('./update');
const search = require('./search');
const paginate = require('./paginate');
const count = require('./count');
const Delete = require('./delete');
const unset = require('./unset');

module.exports = {
    unset: unset(client),
    find: find(client),
    findOne: findOne(client),
    delete: Delete(client),
    count: count(client),
    search: search(client),
    create: create(client),
    update: update(client),
    remove: remove(client),
    paginate: paginate(client),
    updateIfExistsAndCreateIfNot: updateIfExistsAndCreateIfNot(client)
};
