const assert = require('assert');
const faker = require('faker');
const features = require('./features');
const { findOne, create: createUser, comparePassword } = require('../../../../stores/user');
const {
    emailSenderingCong: {
        emailRemitentInOpt,
    subjectOptEmail: subject,
    }
} = require('../../../../config');

describe('Reset the password using temporal password', () => {
    describe('SUCCESS', () => {
        it('/user/opt  POST -> should reset the password with complete flow', (done) => {
            const body = {
                email: faker.internet.email(),
                password: faker.internet.password()
            };
            const emitter = features(emailRemitentInOpt, body.email, subject);

            emitter.on('content', (content) => {
                console.log('content ', content);
                const tempPassword = content.split(': ')[1];
                console.log('tempPassword ', tempPassword);
                const data = {
                    email: body.email,
                    oldPassword: tempPassword,
                    newPassword: 'new_password'
                };
                agent.post('/user/reset/password')
                    .send(data)
                    .expect(200)
                    .then(() => {
                        const user = findOne({ email: body.email });
                        const match = comparePassword(data.newPassword, user.password);
                        assert(!match.error);
                        done();
                    });
            });
            createUser(body)
            .then(() => agent.post('/user/otp')
            .send({email: body.email})
            .expect(200));
        });

        it('/user/opt  POST -> should return a 200 when email is send', async() => {
            const body = {
                email: faker.internet.email(),
                password: faker.internet.password()
            };
            features(emailRemitentInOpt, body.email, subject);
            await createUser(body);
            await agent.post('/user/otp')
                .send({email: body.email})
                .expect(200);
        });
    });

    describe('FAIL', () => {
        it('/user/opt  POST -> should return error if email does not exists', async () => {
            const data = {
                email: `this_email_not_exists_never@${Date.now()}.com`,
                oldPassword: 'oldPassword',
                newPassword: 'new_password'
            };
            await agent
                .post('/user/otp')
                .send(data)
                .expect(404);
        });
    });
});
