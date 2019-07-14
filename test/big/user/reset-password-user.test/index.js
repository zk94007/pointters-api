const assert = require('assert');
const faker = require('faker');
const features = require('./features');
const { findOne, create: createUser, comparePassword, delete: deleteUser } = require('../../../../stores/user');
const {
    emailSenderingCong: {
        emailRemitentInOpt,
    subjectOptEmail: subject,
    contentOptEmail: content
    }
} = require('../../../../config');

describe('Reset the password using temporal password', () => {
    describe('SUCCESS', () => {
        it('/user/reset/password POST -> should reset the password', async () => {
            const body = {
                email:  faker.internet.email(),
                password: 'test_rest',
                tempPassword: 'test_temp',
                resetPasswordExpires: new Date(Date.now() + 10000)
            };
            console.log('before create user ', body);
            const created = await createUser(body);
            console.log('created ', created);
            const data = {
                email: body.email,
                oldPassword: body.tempPassword,
                newPassword: 'new_password'
            };
            await agent
                .post('/user/reset/password')
                .send(data)
                .expect(200);
            const query = { email: body.email };
            const _user = await findOne(query);
            const match = await comparePassword(data.newPassword, _user.password);
            assert(!match.error);
        });

        it('/user/reset/password POST -> should reset the password with complete flow', (done) => {
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
            .then((res) => {
                console.log('body =  ', body);
                console.log('res =  ', res);
                return agent
                    .post('/user/otp')
                    .send({email: body.email})
                    .expect(200);
            });
        });
    });

    describe('FAIL', () => {
        it('/user/reset/password POST -> should reset the password with complete flow', async() => {
            const body = {
                email: faker.internet.email(),
                oldPassword: 'tempPassword',
                newPassword: 'new_password'
            };
            await agent.post('/user/reset/password')
                .send(body)
                .expect(404);
        });
    });

    after(() => deleteUser({}));
});
