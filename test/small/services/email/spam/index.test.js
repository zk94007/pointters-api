const assert = require('assert');

const proxyquire = require('proxyquire');
const pathToModule = '../../../../../services/email/spam/index.js';
const deleteObject = {};
const getObject = {};
const pathStub = {
    './delete': deleteObject,
    './get': getObject
};

const { delete: deleteSpam, get: getSpam } = proxyquire(pathToModule, pathStub);

describe('delete email invalid', () => {
    describe('Success', () => {
        it('should return the get object', () => {
            assert.deepStrictEqual(deleteSpam, deleteObject);
        });

        it('should return the get object', () => {
            assert.deepStrictEqual(getSpam, getObject);
        });
    });
});
