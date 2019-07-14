const assert = require('assert');

const proxyquire = require('proxyquire');
const pathToModule = '../../../../../services/email/invalid/index.js';
const deleteObject = {};
const getObject = {};
const pathStub = {
    './delete': deleteObject,
    './get': getObject
};

const { delete: deleteInvalid, get: getInvalid } = proxyquire(pathToModule, pathStub);

describe('delete email invalid', () => {
    describe('Success', () => {
        it('should return the get object', () => {
            assert.deepStrictEqual(deleteInvalid, deleteObject);
        });

        it('should return the get object', () => {
            assert.deepStrictEqual(getInvalid, getObject);
        });
    });
});
