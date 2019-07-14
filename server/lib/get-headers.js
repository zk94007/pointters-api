const { rateLimit, jwt: { expiresIn } } = require('../../config');

module.exports = () => {
    const tokenExpiresIn = new Date(Date.now() + expiresIn).toString();
    return {
        'X-Rate-Limit': rateLimit,
        'X-Expires-After': tokenExpiresIn
    };
};
