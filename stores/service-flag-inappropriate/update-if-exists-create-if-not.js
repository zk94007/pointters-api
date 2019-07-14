const catchingErrorFromPromise = require('../../lib/catching-error-from-promise');

module.exports = (client) => async (query, data) => catchingErrorFromPromise(
    client
        .findOneAndUpdate(query, { $set: data }, { upsert: true, new: true })
        .then((updatedOrCreated) => updatedOrCreated.map((item) => item.toObject()))
        .then((updatedOrCreated) => updatedOrCreated.map((item) => {
            if (item._id) item._id = item._id.toString();
            return item;
        }))
);
