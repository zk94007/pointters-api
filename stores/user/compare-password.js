const catchingErrorFromPromise = require('../../lib/catching-error-from-promise');

const bcrypt = require('bcrypt');


module.exports = (passw, hash) => catchingErrorFromPromise(new Promise((resolve, reject) => {
    bcrypt.compare(passw, hash, (err, isMatch) => {
        if (err) return reject(err);
        return resolve(isMatch);
    });
}));
