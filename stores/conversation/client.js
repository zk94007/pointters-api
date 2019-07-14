const mongoosePaginate = require('mongoose-paginate');
const mongo = require('../../databases/mongo');
const addSyncHook = require('../../lib/sync-elasticsearch-hook');
const schema = require('./schema');
const addIndex = require('./plugin/add-index');
const Schema = mongo.Schema;
const conversationSchema = new Schema(schema);
conversationSchema.plugin(mongoosePaginate);
addSyncHook(conversationSchema);
addIndex(conversationSchema);
const conversation = mongo.model('conversation', conversationSchema);

module.exports = {
  conversation,
  conversationSchema
}
;
