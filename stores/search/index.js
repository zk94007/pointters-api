const client = require('./client');
const count = require('./count');
const create = require('./create');
const Delete = require('./delete');
const find = require('./find');
const findOne = require('./find-one');
const paginate = require('./paginate');
const remove = require('./remove');
const search = require('./search');
const unset = require('./unset');
const updateIfExistsAndCreateIfNot = require('./update-if-exists-create-if-not');
const update = require('./update');


module.exports = {
    create: create(client),
    count: count(client),
    delete: Delete(client),
    find: find(client),
    findOne: findOne(client),
    paginate: paginate(client),
    remove: remove(client),
    search: search(client),
    unset: unset(client),
    update: update(client),
    updateIfExistsAndCreateIfNot: updateIfExistsAndCreateIfNot(client)
};
