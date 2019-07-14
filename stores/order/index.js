const client = require('./client');
const findOne = require('./find-one');
const create = require('./create');
const remove = require('./remove');
const updateIfExistsAndCreateIfNot = require('./update-if-exists-create-if-not');
const update = require('./update');
const search = require('./search');
const find = require('./find');
const Delete = require('./delete');
const unset = require('./unset');
const count = require('./count');
const avgOnTime  = require('./avgOnTime');
const paginate = require('./paginate');
const numOrders = require('./numOrders');

module.exports = {
    unset: unset(client),
    findOne: findOne(client),
    numOrders: numOrders(client),
    paginate: paginate(client),
    find: find(client),
    count: count(client),
    avgOnTime: avgOnTime(client),
    delete: Delete(client),
    search: search(client),
    create: create(client),
    update: update(client),
    remove: remove(client),
    updateIfExistsAndCreateIfNot: updateIfExistsAndCreateIfNot(client)
};
