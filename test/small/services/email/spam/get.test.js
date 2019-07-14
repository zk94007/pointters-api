const assert = require('assert');

const proxyquire = require('proxyquire');

const spamGetted = [];
const body = spamGetted;
const requestToApi = {};
const pathStub = {
    '../client': {
        API: (request) => {
            assert.deepStrictEqual(request, requestToApi);
            return Promise.resolve({ body });
        },
        emptyRequest: ({ method, path }) => {
            assert(method === 'GET');
            assert(path === '/v3/suppression/spam_reports');
            return requestToApi;
        }
    }
};

const GetSpam = proxyquire('../../../../../services/email/spam/get.js', pathStub);

describe('Get email spamed', () => {
    describe('Success', () => {
        it('should return the spam Getted', async() => {
            const spamsGettedbyGetSpam = await GetSpam();
            assert.deepStrictEqual(spamGetted, spamsGettedbyGetSpam);
        });
    });
});
