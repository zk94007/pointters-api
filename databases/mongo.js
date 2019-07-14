require('mongoose-geojson-schema');
const mongoose = require('mongoose');

const debug = require('../lib/debug');
const config = require('../config');
mongoose.Promise = global.Promise;

if (!mongoose.connection.readyState) mongoose.connect(config.dbpath);
mongoose.connection.on('error', (err) => debug.error(`MongoDB connection error: ${err}`));
mongoose.connection.on('open', () => debug.info(`Connection sucess to ${config.dbpath}`));

module.exports = mongoose;