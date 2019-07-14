const catchingErrorFromPromise = require('../../lib/catching-error-from-promise');

module.exports = (client) => (query) => catchingErrorFromPromise(client
    .findOne(query, {isActive:0}).populate().exec()
    .then((_res) => {
        if (!_res) return _res;
        const res = _res.toObject();
        if (res._id) res._id = res._id.toString();
        if (res.userId) res.userId = res.userId.toString();
        return res;
    }));
