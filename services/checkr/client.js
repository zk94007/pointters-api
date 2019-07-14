const request = require('request');

const parseBody = require('../../lib/parse-body');
const { checkr: { authToken } } = require('../../config');
const auth = {
    user: authToken,
    password: ''
};
const baseUrl = ' https://api.checkr.com/';
const defaultOptiosn = { auth, baseUrl };

module.exports = (options = {}) => new Promise((resolve, reject) => {
    const optionsWithDefaultAttached = Object.assign(defaultOptiosn, options);
    request(optionsWithDefaultAttached, (err, response) => {
        if (err) return reject(err);

        if (response.error) return resolve({ error:response.error });

        resolve(parseBody(response.body));
    });
});
