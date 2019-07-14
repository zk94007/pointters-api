const assert = require('assert');

const proxyquire = require('proxyquire');
const pathToModule = '../../../../services/email/';
const sendEmailObject = {};
const bounceObject = {};
const spamObject = {};
const invalidObject = {};
const pathStub = {
    './send-email': sendEmailObject,
    './bounce': bounceObject,
    './spam': spamObject,
    './invalid': invalidObject
};

const {
    sendEmail,
    spam,
    invalid,
    bounce

} = proxyquire(pathToModule, pathStub);

describe('sendEmail email invalid', () => {
    describe('Success', () => {
        it('should return the get object', () => {
            assert.deepStrictEqual(sendEmail, sendEmailObject);
        });

        it('should return the get object', () => {
            assert.deepStrictEqual(spam, spamObject);
        });
        it('should return the get object', () => {
            assert.deepStrictEqual(invalid, invalidObject);
        });
        it('should return the get object', () => {
            assert.deepStrictEqual(bounce, bounceObject);
        });
    });
});
