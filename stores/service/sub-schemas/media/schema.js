const { Schema } = require('../../../../databases/mongo');


module.exports = new Schema({
    fileName: {
        type: String
    },
    mediaType: {
        type: String,
        enum: [ 'image', 'video', 'document' ]
    },
    videoThumbnail: {
      type: String
    }
});
