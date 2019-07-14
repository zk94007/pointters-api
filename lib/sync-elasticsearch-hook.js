const mongoosastic = require('mongoosastic');
const elasticsearch = require('elasticsearch');
const connectionClass = require('http-aws-es');
const AWS = require('aws-sdk');

const { elasticsearch: { hosts } } = require('../config');

AWS.config.update({ 
	accessKeyId: "AKIAIGALHANVPEWURBJA",
	secretAccessKey: "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",
	region: 'us-east-1' 
});
const esClient = elasticsearch.Client({ connectionClass, hosts });
module.exports = (model) => model.plugin(mongoosastic, { esClient });

