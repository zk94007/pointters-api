const assert = require('assert');

const proxyquire = require('proxyquire');

const invalidGetted = [];
const body = invalidGetted;
const requestToApi = {};
const pathStub = {
    '../client': {
        API: (request) => {
            assert.deepStrictEqual(request, requestToApi);
            return Promise.resolve({ body });
        },
        emptyRequest: ({ method, path }) => {
            assert(method === 'GET');
            assert(path === '/v3/suppression/invalid_emails');
            return requestToApi;
        }
    }
};

const GetInvalid = proxyquire('../../../../../services/email/invalid/get.js', pathStub);

describe('Get email invalid', () => {
    describe('Success', () => {
        it('should return the invalid Getted', async() => {
            const invalidsGettedbyGetInvalid = await GetInvalid();
            assert.deepStrictEqual(invalidGetted, invalidsGettedbyGetInvalid);
        });
    });
});
