const assert = require('assert');
const config = require('../../../config');
describe('config UT', () => {
    it('should return a object', () => {
        assert(typeof config === 'object');
    });
});
