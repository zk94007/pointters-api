const config = require('../config');
const moneo = require("moneo")({
  url: config.neo4j.url
});

module.exports = moneo;