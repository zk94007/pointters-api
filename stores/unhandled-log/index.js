const client = require('./client');
const findOne = require('./find-one');
const create = require('./create');
const search = require('./search');

module.exports = {
    findOne: findOne(client),
    search: search(client),
    create: create(client),
};
