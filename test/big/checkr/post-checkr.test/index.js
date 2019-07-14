const assert = require('assert');

const features = require('./features');
const { findOne: findOneOffer } = require('../../../../stores/background-candidate');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/checkr POST sohuld create a request given', (done) => {
            const body = {
                first_name:'firstName',
                middle_name:'middleName',
                last_name:'lastName',
                email:`email${Date.now()}@test.com`,
                phone:'23432432432',
                zipcode:'90401',
                dob:'Wed Jan 21 1970 18:00:00 GMT-0600 (CST)',
                ssn:'111-11-2001',
                driver_license_number:'F1112001',
                driver_license_state:'CA'
            };
            const emitter = features(body.email);
            console.log('antes de agregar listener');
            emitter.on('done', () => {
                delete body.bob;
                console.log('body = ', body);
                findOneOffer({email:body.email})
                    .then((candidate) => {
                        console.log('candidate ', candidate);
                        assert(candidate.isActive === undefined);
                    })
                    .then(() => done());
            });
            console.log('antes de llamar la api');
            agent.post('/checkr')
                .send(body)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200)
                .then(({body}) => assert(body.success));
        });
    });

    describe('FAIL', () => {
    });
});
