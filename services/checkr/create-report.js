
const callAPI = require('./client');
const uri = '/v1/reports';
const method = 'POST';
const options = { uri, method };

module.exports = async(data) => {
    options.json = data;
    return await callAPI(options);
};
