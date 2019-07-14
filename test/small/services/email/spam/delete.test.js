const assert = require('assert');

const proxyquire = require('proxyquire');

const spamDeleted = [];
const body = spamDeleted;
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
            assert(path === '/v3/suppression/spam_reports');
            assert.deepStrictEqual(emails, emailToDelete);
            return requestToApi;
        }
    }
};

const deleteSpam = proxyquire('../../../../../services/email/spam/delete.js', pathStub);

describe('delete email spamed', () => {
    describe('Success', () => {
        it('should return the spam deleted', async () => {
            const spamsDeltedbyDeleteSpam = await deleteSpam(emailToDelete);
            assert.deepStrictEqual(spamDeleted, spamsDeltedbyDeleteSpam);
        });
    });
});

