const assert = require('assert');

const { create: createReport } = require('../../../stores/background-report');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/request/checkr GET sohuld create a request given', async() => {
            const reportCreated = await createReport({
                userId: __user._id,
                status: 'String',
                turnaroundTime: 1,
                tags: 'String',
                candidateId: 'String',
                ssnTraceId: 'String',
                sexOffenderSearchId: 'String',
                nationalCriminalSearchId: 'String',
                federalCriminalSearchId: 'String',
                countyCriminalSearchIds: [ 'String' ],
                motorVehicleReportId: 'String',
                stateCriminalSearchIds: [ 'String' ],
                documentIds: [ 'String' ]

            });
            console.log('reportCreated = ', reportCreated);
            const { body: res } = await agent
                .get(`/checkr/${reportCreated._id}`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            console.log('res =====', res);
            assert(typeof res.checkr === 'object');
        });
    });

    describe('FAIL', () => {
        it('/request/checkr GET sohuld create a request given', async() => {
            await agent
                .get('/checkr/1234567890qwertyuiopasdf')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });
});
