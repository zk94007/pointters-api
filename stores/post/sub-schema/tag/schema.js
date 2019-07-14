const { Schema } = require('../../../../databases/mongo');

const schema = new Schema({
    type: {
      type:String,
      enum:['service','user']
    },
    id: String
});

module.exports = schema;
