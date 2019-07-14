const catchingErrorFromPromise = require('../../lib/catching-error-from-promise');
const excludeFields = {
    likes: 0,
    watching: 0,
    likesPost: 0,
    following: 0,
    __v: 0
};
module.exports = (client) => (query) => catchingErrorFromPromise(
    client.findOne(query, excludeFields).exec()
        .then((_res) => {
            if (!_res) return _res;
            const res = _res.toObject();
            if (res._id) res._id = res._id.toString();
            return res;
        }));
