const joi = require('joi');

const schema = require('./schema-candidate');

module.exports = (data) => joi.validate(data, schema);

