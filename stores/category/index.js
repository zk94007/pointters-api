const client = require('./client');
const findOne = require('./find-one');
const find = require('./find');
const count = require('./count');
const create = require('./create');
const remove = require('./remove');
const updateIfExistsAndCreateIfNot = require('./update-if-exists-create-if-not');
const update = require('./update');
const search = require('./search');
const Delete = require('./delete');

const unset = require('./unset');
const {methods: subCategoryMethods} = require('./sub-schema/sub-category');


module.exports = {
    unset: unset(client),
    findOne: findOne(client),
    find: find(client),
    count: count(client),
    delete: Delete(client),
    search: search(client),
    create: create(client),
    update: update(client),
    remove: remove(client),
    subCategory: subCategoryMethods(client),
    updateIfExistsAndCreateIfNot: updateIfExistsAndCreateIfNot(client)
};
