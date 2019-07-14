const assert = require('assert');

const { create: createReport, findOne: findOneReport } = require('../../../stores/background-report');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/checkr/:idReport DELETE sohuld create a request given', async () => {
            const checkr = {
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
            };
            const reportCreated = await createReport(checkr);
            console.log('checkr ====: ', reportCreated);
            await agent.delete(`/checkr/${reportCreated._id}`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            const reportNotActive = findOneReport({ _id: reportCreated._id });
            assert(!reportNotActive.isActive);
        });
    });

    describe('FAIL', () => {
        it('/checkr/:idReport DELETE sohuld create a request given', async () => {
            await agent.delete('/checkr/1234567890qwertyuiopasdf')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });
});
