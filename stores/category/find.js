const catchingErrorFromPromise = require('../../lib/catching-error-from-promise');

module.exports = (client) => (query, opt = {}) => {
    const _query = client.find(query, {isActive:0});

    if (opt.limit) _query.limit(opt.limit).sort({createdAt:-1});

    return catchingErrorFromPromise(_query.populate().exec()
    .then((results) => results.map((_res) => {
        if (!_res) return _res;
        const res = _res.toObject();
        if (res._id) res._id = res._id.toString();
        return res;
    })));
};
