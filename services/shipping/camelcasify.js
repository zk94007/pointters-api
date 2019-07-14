const camelcase = require('camelcase');


const camelcasify = (obj) => {
    if (typeof obj !== 'object') return obj;
    const keys = Object.keys(obj);
    return keys.map((key) => camelcase(key))
        .reduce((res, key, index) => {
            res[key] = res[key] = obj[keys[index]] &&
            typeof obj[keys[index]] === 'object' &&
            !Array.isArray(obj[keys[index]]) ?
            camelcasify(obj[keys[index]]) :
            Array.isArray(obj[keys[index]]) ?
            obj[keys[index]].map(camelcasify) :
             obj[keys[index]];
            return res;
        }, {});
};
module.exports = camelcasify;
