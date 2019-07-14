const { Schema } = require('../../../../databases/mongo');


const schema = new Schema({
    city: String,
    country: String,
    geoJson: Schema.Types.GeoJSON,
    postalCode: String,
    province: String,
    state: String,
});


schema.index({ geoJson: '2dsphere' });

module.exports = schema;

