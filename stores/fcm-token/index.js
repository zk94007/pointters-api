const client = require('./client');
const create = require('./create');
const findOne = require('./find-one');
const update = require('./create');
const insert = require('./insert');
const findOneToken = require('./find-one-token');
const remove = require('./remove');

module.exports = {
  create: create(client),
  findOne: findOne(client),
  update: update(client),
  insert: insert(client),
  findOneToken:findOneToken(client),
  remove: remove(client)
};
