
const bcrypt = require('bcrypt');

module.exports = (data) => bcrypt.genSalt(10)
    .then((salt) => bcrypt.hash(data.tempPassword, salt))
    .then((hash) => {
        data.tempPassword = hash;
        return data;
    });
