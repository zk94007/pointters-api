const assert = require('assert');

const proxyquire = require('proxyquire');

const pathToModule = '../../../../domain/schedule-tasks/check-email-invalid';

describe('CheckInvalids test', () => {
    describe('Success', () => {
        it('should call the delete function', (done) => {
            const invalids = [ {} ];
            const updated = [ {} ];
            const pathStub = {
                '../../services/email/invalid': {
                    get: () => Promise.resolve(invalids),
                    delete: (toDelete) => {
                        assert.deepStrictEqual(toDelete, updated);
                        done();
                        return Promise.resolve();
                    },
                },
                '../../stores/user': {
                    updateEmailInvalid: (update) => {
                        assert.deepStrictEqual(update, invalids);
                        return Promise.resolve(updated);
                    }
                }
            };
            const checkInvalids = proxyquire(pathToModule, pathStub);
            checkInvalids();
        });

        it('should not call the update if invalids is empty', () => {
            const invalids = [];
            const pathStub = {
                '../../services/email/invalid': {
                    get: () => Promise.resolve(invalids),
                    delete: () => ({}),
                },
                '../../stores/user': {
                    updateEmailInvalid: () => {
                        throw new Error('this no happen');
                    }
                }
            };
            const checkInvalids = proxyquire(pathToModule, pathStub);
            return checkInvalids();
        });

        it('should not call the delete if update return empty', () => {
            const invalids = [ {} ];
            const updated = [];
            const pathStub = {
                '../../services/email/invalid': {
                    get: () => Promise.resolve(invalids),
                    delete: () => {
                        throw new Error('delete is not called');
                    },
                },
                '../../stores/user': {
                    updateEmailInvalid: () => Promise.resolve(updated)
                }
            };
            const checkInvalids = proxyquire(pathToModule, pathStub);
            return checkInvalids();
        });
    });
});
