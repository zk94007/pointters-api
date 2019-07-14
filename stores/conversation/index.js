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

module.exports = {
    unset: unset(client.conversation),
    find: find(client.conversation),
    findOne: findOne(client.conversation),
    delete: Delete(client.conversation),
    search: search(client.conversation),
    create: create(client.conversation),
    update: update(client.conversation),
    remove: remove(client.conversation),
    paginate: paginate(client.conversation),
    updateIfExistsAndCreateIfNot: updateIfExistsAndCreateIfNot(client.conversation)
};
