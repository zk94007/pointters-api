const assert = require('assert');

const env = require('../../../../config/environments/development');
describe('prodction enviroment config UT', () => {
    it('should return a object', () => {
        assert(typeof env === 'object');
    });
});
