const assert = require('assert');

const proxyquire = require('proxyquire');

const requestToAPI = {};
const pathToModule = '../../../../services/email/send-email';
const response = { };
const pathStub = {
    './client': {
        emptyRequest: ({ method, path, body }) => {
            assert(method === 'POST');
            assert(path === '/v3/mail/send');
            assert(typeof body === 'object');
            return requestToAPI;
        },

        API: (request) => {
            assert.deepStrictEqual(request, requestToAPI);
            return response;
        }
    }

};

const sendEmail = proxyquire(pathToModule, pathStub);
const sender = 'test@test.com';
const subject = 'subject';
const content = 'content';

describe('Get the sendMail object', () => {
    describe('Success', () => {
        it('should return the get object', async () => {
            const reponseFromSendEmail = await sendEmail(sender, subject, content);
            assert.deepStrictEqual(reponseFromSendEmail, response);
        });
    });
});
