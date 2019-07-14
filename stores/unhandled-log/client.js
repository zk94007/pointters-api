const mongo = require('../../databases/mongo');
const addSyncHook = require('../../lib/sync-elasticsearch-hook');
const schema = require('./schema');
const addIndex = require('./plugin/add-index');
const Schema = mongo.Schema;
const requestLogSchema = new Schema(schema, {strict: false});
addSyncHook(requestLogSchema);
addIndex(requestLogSchema);
const requestLog = mongo.model('unhandled-log', requestLogSchema);

module.exports = requestLog;
