const mongo = require('../../databases/mongo');
const addSyncHook = require('../../lib/sync-elasticsearch-hook');
const schema = require('./schema');
const addIndex = require('./plugin/add-index');
const Schema = mongo.Schema;
const storeSchema = new Schema(schema);
addSyncHook(storeSchema);
addIndex(storeSchema);
const storeModel = mongo.model('background-report', storeSchema);

module.exports = storeModel;
