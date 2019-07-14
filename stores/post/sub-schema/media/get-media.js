const catchingErrorFromPromise = require('../../../../lib/catching-error-from-promise');

module.exports = (client) => (query) => catchingErrorFromPromise(
        client.findOne(query, {media:1}).exec()
            .then((_res) => {
                if (!_res) return _res;
                return _res.toObject().media || [];
            })
    );
