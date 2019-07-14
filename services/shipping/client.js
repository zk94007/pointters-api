const { easyPost:{ApiKey: apiKey }} = require('../../config');
const EasyPost = require('@easypost/api');

const api = new EasyPost(apiKey);

module.exports = api;
