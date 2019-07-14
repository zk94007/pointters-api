const assert = require('assert');

const proxyquire = require('proxyquire');

const pathToModule = '../../../../domain/schedule-tasks/check-email-bounces';

describe('CheckBounces test', () => {
    describe('Success', () => {
        it('should call the delete function', (done) => {
            const bounces = [ {} ];
            const updated = [ {} ];
            const pathStub = {
                '../../services/email/bounce':{
                    get: () => Promise.resolve(bounces),
                    delete: (toDelete) => {
                        assert.deepStrictEqual(toDelete, updated);
                        done();
                        return Promise.resolve();
                    },
                },
                '../../stores/user': {
                    updateEmailBounce:(update) => {
                        assert.deepStrictEqual(update, bounces);
                        return Promise.resolve(updated);
                    }
                }
            };
            const checkBounces = proxyquire(pathToModule, pathStub);
            checkBounces();
        });

        it('should not call the update if bounces is empty', () => {
            const bounces = [ ];
            const pathStub = {
                '../../services/email/bounce':{
                    get: () => Promise.resolve(bounces),
                    delete: () => ({}),
                },
                '../../stores/user': {
                    updateEmailBounce:() => {
                        throw new Error('this no happen');
                    }
                }
            };
            const checkBounces = proxyquire(pathToModule, pathStub);
            return checkBounces();
        });

        it('should not call the delete if update return empty', () => {
            const bounces = [ {} ];
            const updated = [ ];
            const pathStub = {
                '../../services/email/bounce':{
                    get: () => Promise.resolve(bounces),
                    delete: () => {
                        throw new Error('delete is not called');
                    },
                },
                '../../stores/user': {
                    updateEmailBounce:() => Promise.resolve(updated)
                }
            };
            const checkBounces = proxyquire(pathToModule, pathStub);
            return checkBounces();
        });
    });
});
