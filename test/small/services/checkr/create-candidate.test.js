const assert = require('assert');

const proxyquire = require('proxyquire');

const pathToModule = '../../../../services/checkr/create-candidate.js';
const data = {};
const dataValidated = {};

describe('Create candidate', () => {
    describe('Success', () => {
        it('should call the request with correct params', async() => {
            const error = null;
            const response = {};
            const pathStub = {
                './client':(opt) => {
                    assert.deepStrictEqual(opt.json, dataValidated);
                    return Promise.resolve(response);
                },
                './validate-candidate':(dataReceived) => {
                    console.log('in validate ', dataReceived);
                    assert.deepStrictEqual(dataReceived, data);
                    return { error, value: dataValidated };
                }
            };
            console.log('importing');
            const createCandidate = proxyquire(pathToModule, pathStub);
            const options = {};
            const res = await createCandidate(options);
            assert.deepStrictEqual(res, response);
        });

        it('should catch the errors', async() => {
            const error = {};
            const response = {};
            const pathStub = {
                './client':(opt) => {
                    assert.deepStrictEqual(opt.json, dataValidated);
                    return Promise.resolve(response);
                },
                './validate-candidate':(dataReceived) => {
                    console.log('in validate ', dataReceived);
                    assert.deepStrictEqual(dataReceived, data);
                    return { error, value: dataValidated };
                }
            };
            console.log('importing');
            const createCandidate = proxyquire(pathToModule, pathStub);
            const options = {};
            const {error: errorReturned} = await createCandidate(options);
            assert.deepStrictEqual(errorReturned, error);
        });
    });
});

