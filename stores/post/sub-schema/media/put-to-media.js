const catchingErrorFromPromise = require('../../../../lib/catching-error-from-promise');

module.exports = (client) => async(query, media) => {
    try {
        console.log('query', query);
        console.log('media', media);
        const post = await client.findOne(query, {media:1});

        if (!post) return {};

        post.media.forEach((_media) => Object.assign(_media, media));
        return await catchingErrorFromPromise(post.save());
    } catch (error) {
        return {error};
    }
};
