const bcrypt = require('bcrypt');

module.exports = (schema) => {
    schema.pre('save', function(next) {
        const user = this;

        if (!user.isModified('password') && !user.isNew) return next();

        bcrypt.genSalt(10)
            .then((salt) => bcrypt.hash(user.password, salt))
            .then((hash) => {
                user.password = hash;
                next();
            })
            .catch(next);
    });
    schema.pre('save', function(next) {
        const user = this;
        if (!user.isModified('tempPassword') && !user.isNew || !user.tempPassword) return next();
        bcrypt.genSalt(10)
            .then((salt) => bcrypt.hash(user.tempPassword, salt))
            .then((hash) => {
                user.tempPassword = hash;
                next();
            })
            .catch(next);
    });
};
