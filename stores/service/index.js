const client = require('./client');
const find = require('./find');
const findOne = require('./find-one');
const create = require('./create');
const remove = require('./remove');
const updateIfExistsAndCreateIfNot = require('./update-if-exists-create-if-not');
const update = require('./update');
const search = require('./search');
const paginate = require('./paginate');
const Delete = require('./delete');
const unset = require('./unset');
const count = require('./count');

module.exports = {
    unset: unset(client.storeModel),
    find: find(client.storeModel),
    findOne: findOne(client.storeModel),
    delete: Delete(client.storeModel),
    count: count(client.storeModel),
    search: search(client.storeModel),
    create: create(client.storeModel),
    update: update(client.storeModel),
    remove: remove(client.storeModel),
    paginate: paginate(client.storeModel),
    updateIfExistsAndCreateIfNot: updateIfExistsAndCreateIfNot(client.storeModel)
};
