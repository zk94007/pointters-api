const client = require('./client');
const findOne = require('./find-one');
const create = require('./create');
const remove = require('./remove');
const updateIfExistsAndCreateIfNot = require('./update-if-exists-create-if-not');
const update = require('./update');
const search = require('./search');
const {methods: mediaMethods} = require('./sub-schema/media');
const unset = require('./unset');

module.exports = {
    unset: unset(client),
    findOne: findOne(client),
    create: create(client),
    search: search(client),
    update: update(client),
    remove: remove(client),
    media: mediaMethods(client),
    updateIfExistsAndCreateIfNot: updateIfExistsAndCreateIfNot(client)
};
