

const assert = require('assert');

const proxyquire = require('proxyquire');

const pathToModule = '../../../../services/checkr/get-report.js';

describe('Create report', () => {
    describe('Success', () => {
        it('should call the request with correct params', async() => {
            const response = {};
            const pathStub = {
                './client':(opt) => {
                    assert(opt.method, 'GET');
                    return Promise.resolve(response);
                }
            };
            const createCandidate = proxyquire(pathToModule, pathStub);
            const options = {};
            const res = await createCandidate(options);
            assert.deepStrictEqual(res, response);
        });

        it('should catch the errors', async() => {
            const response = {error: {}};
            const pathStub = {
                './client':(opt) => {
                    assert(opt.method, 'GET');
                    return Promise.resolve(response);
                }
            };
            const createCandidate = proxyquire(pathToModule, pathStub);
            const options = {};
            const {error: errorReturned} = await createCandidate(options);
            console.log('errorReturned', errorReturned);
            assert.deepStrictEqual(errorReturned,response.error);
        });
    });
});

