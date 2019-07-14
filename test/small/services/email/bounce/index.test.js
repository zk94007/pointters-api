const assert = require('assert');

const proxyquire = require('proxyquire');
const pathToModule = '../../../../../services/email/bounce/index.js';
const deleteObject = {};
const getObject = {};
const pathStub = {
    './delete': deleteObject,
    './get': getObject
};

const { delete: deleteBounce, get: getBounce } = proxyquire(pathToModule, pathStub);

describe('delete email bounced', () => {
    describe('Success', () => {
        it('should return the get object', () => {
            assert.deepStrictEqual(deleteBounce, deleteObject);
        });

        it('should return the get object', () => {
            assert.deepStrictEqual(getBounce, getObject);
        });
    });
});
