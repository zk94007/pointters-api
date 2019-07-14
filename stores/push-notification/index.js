const client = require('./client');
const findOne = require('./find-one');
const create = require('./create');
const remove = require('./remove');
const updateIfExistsAndCreateIfNot = require('./update-if-exists-create-if-not');
const update = require('./update');
const search = require('./search');

const Delete = require('./delete');
const unset = require('./unset');

module.exports = {
    unset: unset(client),
    findOne: findOne(client),
    delete: Delete(client),
    search: search(client),
    create: create(client),
    update: update(client),
    remove: remove(client),
    updateIfExistsAndCreateIfNot: updateIfExistsAndCreateIfNot(client)
};
