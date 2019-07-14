const catchingErrorFromPromise = require('../../lib/catching-error-from-promise');

module.exports = (client) => (query) => catchingErrorFromPromise(
     new Promise((resolve, reject) => {
         const cb = (err, results) => {
             if (err) return reject(err);

             resolve(results);
         };
         client.search({query}, cb);
     }));
