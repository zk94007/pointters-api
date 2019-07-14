const Fb = require('fb');

const { facebook } = require('../../../config');
console.log('facebook ', facebook);
const fb = new Fb.Facebook(facebook);


module.exports = async (token) => {
    fb.setAccessToken(token);
    return await fb.api('/me').catch((error) => ({ error }));
};
