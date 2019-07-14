const bcrypt = require('bcrypt');


module.exports = (data) => bcrypt.genSalt(10)
    .then((salt) => bcrypt.hash(data.password, salt))
    .then((hash) => {
        data.password = hash;
        return data;
    });
