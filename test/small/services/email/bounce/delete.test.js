const assert = require('assert');

const proxyquire = require('proxyquire');

const bounceDeleted = [];
const body = bounceDeleted;
const emailToDelete = [];
const requestToApi = {};
const pathStub = {
    '../client': {
        API: (request) => {
            assert.deepStrictEqual(request, requestToApi);
            return Promise.resolve({ body });
        },
        emptyRequest: ({ method, path, body: { emails } }) => {
            assert(method === 'DELETE');
            assert(path === '/v3/suppression/bounces');
            assert.deepStrictEqual(emails, emailToDelete);
            return requestToApi;
        }
    }
};

const deleteBounce = proxyquire('../../../../../services/email/bounce/delete.js', pathStub);

describe('delete email bounced', () => {
    describe('Success', () => {
        it('should return the bounce deleted', async() => {
            const bouncesDeltedbyDeleteBounce = await deleteBounce(emailToDelete);
            assert.deepStrictEqual(bounceDeleted, bouncesDeltedbyDeleteBounce);
        });
    });
});
