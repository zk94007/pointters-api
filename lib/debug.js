const debug = require('debug');
const { apiName } = require('../config');
const debuger = debug(apiName);
debuger.info = debug(`${apiName}:info`);
debuger.error = debug(`${apiName}:error`);

const apiServicesToDebug = [
    'http',
    'store',
    'usecase'
];

debuger.api = debug(`${apiName}:api`);
debuger.api.error = debug(`${apiName}:api:error`);
debuger.api.info = debug(`${apiName}:api:info`);
apiServicesToDebug.forEach((service) => {
    debuger.api[service] = debug(`${apiName}:api:${service}`);
    debuger.api[service].info = debug(`${apiName}:api:${service}:info`);
    debuger.api[service].error = debug(`${apiName}:api:${service}:error`);
});

const appServicesToDebug = [
    'service',
    'store'
];

appServicesToDebug.forEach((service) => {
    debuger[service] = debug(`${apiName}:${service}`);
    debuger[service].info = debug(`${apiName}:${service}:info`);
    debuger[service].error = debug(`${apiName}:api:${service}:error`);
});

module.exports = debuger;
