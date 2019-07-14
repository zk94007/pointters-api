const Schema = require('../../../../databases/mongo').Schema;

module.exports = new Schema({
    mediaType: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    videoThumbnail: {
      type: String
    }
});
