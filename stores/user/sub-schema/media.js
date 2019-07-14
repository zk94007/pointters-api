const Schema = require('../../../databases/mongo').Schema;


module.exports = new Schema({
    fileName:{
        type: String
    },
    mediaType:{
        type: String,
        enum: [ 'image', 'video' ]
    },
    videoThumbnail: {
      type: String
    }
});
