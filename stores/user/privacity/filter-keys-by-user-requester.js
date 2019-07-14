const { propsToBeEverPrivate = '' } = require('../../../config');

const filterEverForPrivacity = new RegExp(propsToBeEverPrivate.replace(/,/g, '|'));

module.exports = (userToFilter, userRequester) => {
    try {
        if (!userToFilter || !userRequester) return {};

        const { settings = {} } = userToFilter;
        const requesterIsFollower = new Set(userRequester.following)
                .has(userToFilter._id);
        return Object.keys(userToFilter)
                .filter((prop) => {
                    const permission = settings[`${prop}ViewPermission`] || 'public';

                    if (filterEverForPrivacity.test(prop)) return false;

                    if (requesterIsFollower) return permission === 'followers';

                    return permission !== 'onlyme';
                })
                .reduce((filtered, key) => {
                    filtered[key] = userToFilter[key];
                    return filtered;
                }, {});
    } catch (error) {
        return {error};
    }
};
