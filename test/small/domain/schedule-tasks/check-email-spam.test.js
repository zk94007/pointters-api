const assert = require('assert');

const proxyquire = require('proxyquire');

const pathToModule = '../../../../domain/schedule-tasks/check-email-spam.js';

describe('CheckSpams test', () => {
    describe('Success', () => {
        it('should call the delete function', (done) => {
            const spams = [ {} ];
            const updated = [ {} ];
            const pathStub = {
                '../../services/email/spam': {
                    get: () => Promise.resolve(spams),
                    delete: (toDelete) => {
                        assert.deepStrictEqual(toDelete, updated);
                        done();
                        return Promise.resolve();
                    },
                },
                '../../stores/user': {
                    updateEmailSpam: (update) => {
                        assert.deepStrictEqual(update, spams);
                        return Promise.resolve(updated);
                    }
                }
            };
            const checkSpams = proxyquire(pathToModule, pathStub);
            checkSpams();
        });

        it('should not call the update if spams is empty', () => {
            const spams = [];
            const pathStub = {
                '../../services/email/spam': {
                    get: () => Promise.resolve(spams),
                    delete: () => ({}),
                },
                '../../stores/user': {
                    updateEmailSpam: () => {
                        throw new Error('this no happen');
                    }
                }
            };
            const checkSpams = proxyquire(pathToModule, pathStub);
            return checkSpams();
        });

        it('should not call the delete if update return empty', () => {
            const spams = [ {} ];
            const updated = [];
            const pathStub = {
                '../../services/email/spam': {
                    get: () => Promise.resolve(spams),
                    delete: () => {
                        throw new Error('delete is not called');
                    },
                },
                '../../stores/user': {
                    updateEmailSpam: () => Promise.resolve(updated)
                }
            };
            const checkSpams = proxyquire(pathToModule, pathStub);
            return checkSpams();
        });
    });
});
