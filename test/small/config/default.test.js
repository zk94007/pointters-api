const assert = require('assert');

const env = require('../../../config/default');
describe('prodction enviroment config UT', () => {
    it('should return a object', () => {
        assert(typeof env === 'object');
    });
});
