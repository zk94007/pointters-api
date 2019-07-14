const Schema = require('../../../../databases/mongo').Schema;

module.exports = new Schema({
    keywords: [ String ],
    name: {
        type: String,
        required: true
    },
    icon: String,
    thumbnail: String
});
