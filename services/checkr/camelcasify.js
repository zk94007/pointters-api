const camelcase = require('camelcase');


const camelcasify = (obj) => {
    const keys = Object.keys(obj);
    return keys.map((key) => camelcase(key))
        .reduce((res, key, index) => {
            res[key] = obj[keys[index]] &&
            typeof obj[keys[index]] === 'object' &&
            !Array.isArray(obj[keys[index]]) ?
            camelcasify(obj[keys[index]]) :
                obj[keys[index]];
            return res;
        }, {});
};
module.exports = camelcasify;
