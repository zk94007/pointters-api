const assert = require('assert');

const proxyquire = require('proxyquire');

const pathToModule = '../../../../services/email/client.js';
const key = {};
const clientReturned = {};
const pathStub = {
    'sendgrid': (api_key) => {
        assert.deepStrictEqual(api_key, key);
        return clientReturned;
    },
    '../../config': {
        emailSenderingCong: {
            sendgridApiKey: key
        }
    }

};

const client = proxyquire(pathToModule, pathStub);


describe('Get the client', () => {
    describe('Success', () => {
        it('should return the get object', () => {
            assert.deepStrictEqual(client, clientReturned);
        });
    });
});
