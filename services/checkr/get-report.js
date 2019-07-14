const callAPI = require('./client');
const uri = '/v1/reports';
const method = 'GET';
const camelcasify = require('./camelcasify');
const options = { uri, method };

module.exports = async(reportId) => {
    options.uri = `/reports/${reportId}`;
    const data = await callAPI(options);
    const dataCamelcasified = camelcasify(data);
    return dataCamelcasified;
};
