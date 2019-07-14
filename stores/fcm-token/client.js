const mongoosePaginate = require('mongoose-paginate');
const mongo = require('../../databases/mongo');
const moneo = require('../../databases/moneo');
const addSyncHook = require('../../lib/sync-elasticsearch-hook');
const schema = require('./schema');
const addIndex = require('./plugin/add-index');
const Schema = mongo.Schema;
const storeSchema = new Schema(schema);
storeSchema.plugin(moneo);
storeSchema.plugin(mongoosePaginate);
addSyncHook(storeSchema);
addIndex(storeSchema);
const storeModel = mongo.model('fcm-token', storeSchema);

module.exports = storeModel;
