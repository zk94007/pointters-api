const catchErrorFromPromise = require('../../lib/catching-error-from-promise');

const excludeFields = {
    likes: 0,
    watching: 0,
    likesPost: 0,
    following: 0
};


module.exports = (client) => async (query, data) => {
    let user = await catchErrorFromPromise(client.findOne(query, excludeFields));

    if (!user) user = await catchErrorFromPromise(client.create(data));

    if (user.error) return await Promise.resolve({error: user.error});

    user = user.toObject();
    user._id = user._id.toString();
    return user;
};
