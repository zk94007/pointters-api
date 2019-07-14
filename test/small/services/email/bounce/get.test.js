const assert = require('assert');

const proxyquire = require('proxyquire');

const bounceGetted = [];
const body = bounceGetted;
const requestToApi = {};
const pathStub = {
    '../client': {
        API: (request) => {
            assert.deepStrictEqual(request, requestToApi);
            return Promise.resolve({ body });
        },
        emptyRequest: ({ method, path }) => {
            assert(method === 'GET');
            assert(path === '/v3/suppression/bounces');
            return requestToApi;
        }
    }
};

const GetBounce = proxyquire('../../../../../services/email/bounce/get.js', pathStub);

describe('Get email bounced', () => {
    describe('Success', () => {
        it('should return the bounce Getted', async() => {
            const bouncesGettedbyGetBounce = await GetBounce();
            assert.deepStrictEqual(bounceGetted, bouncesGettedbyGetBounce);
        });
    });
});
