const mongoosePaginate = require('mongoose-paginate');
const mongo = require('../../databases/mongo');
const addSyncHook = require('../../lib/sync-elasticsearch-hook');
const schema = require('./schema');
const addIndex = require('./plugin/add-index');
const Schema = mongo.Schema;
const storeSchema = new Schema(schema);
storeSchema.plugin(mongoosePaginate);
addSyncHook(storeSchema);
addIndex(storeSchema);
const storeModel = mongo.model('message', storeSchema);

module.exports = storeModel;
