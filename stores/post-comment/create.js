const catchingErrorFromPromise = require('../../lib/catching-error-from-promise');

module.exports = (client) => (data) => {
    data.createdAt = new Date();
    data.updatedAt = new Date();
    return catchingErrorFromPromise(client.create(data)
        .then((_res) => {
            if (!_res) return _res;
            const res = _res.toObject();
            if (res._id) res._id = res._id.toString();
            return res;
        }));
};
