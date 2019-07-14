const assert = require('assert');

const proxyquire = require('proxyquire');

const invalidDeleted = [];
const body = invalidDeleted;
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
            assert(path === '/v3/suppression/invalid_emails');
            assert.deepStrictEqual(emails, emailToDelete);
            return requestToApi;
        }
    }
};

const deleteInvalid = proxyquire('../../../../../services/email/invalid/delete.js', pathStub);

describe('delete email invalid', () => {
    describe('Success', () => {
        it('should return the invalid deleted', async() => {
            const invalidsDeltedbyDeleteInvalid = await deleteInvalid(emailToDelete);
            assert.deepStrictEqual(invalidDeleted, invalidsDeltedbyDeleteInvalid);
        });
    });
});
