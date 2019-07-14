const mongo = require('../../databases/mongo');
const moneo = require('../../databases/moneo');
const schema = require('./schema');
const addHooks = require('./plugins/add-hooks');
const addIndex = require('./plugins/add-index');
const addSyncHook = require('../../lib/sync-elasticsearch-hook');

const Schema = mongo.Schema;

const storeSchema = new Schema(schema);
storeSchema.plugin(moneo);
addHooks(storeSchema);
addIndex(storeSchema);
addSyncHook(storeSchema);
const storeModel = mongo.model('user', storeSchema);

module.exports = storeModel;
