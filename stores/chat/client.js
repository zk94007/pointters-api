const mongo = require('../../databases/mongo');
const addSyncHook = require('../../lib/sync-elasticsearch-hook');
const schema = require('./schema');
const addIndex = require('./plugin/add-index');
const Schema = mongo.Schema;
const requestSchema = new Schema(schema);
addSyncHook(requestSchema);
addIndex(requestSchema);
const request = mongo.model('chat', requestSchema);

module.exports = request;
