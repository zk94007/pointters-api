const { create: saveCandidate } = require('../../../../stores/background-candidate');
const { create: saveReport } = require('../../../../stores/background-report');
const { create: createLog } = require('../../../../stores/unhandled-log');

const {createCandidate, createReport, getReport} = require('../../../../services/checkr');

module.exports = (candidate, state) => (async() => {
    console.log('candidate =', candidate);
    const candidateCreated = await createCandidate(candidate);
    console.log('candidateCreated =', candidateCreated);
    const candidateToSave = Object.assign({
        userId: state.user.id,
    }, candidate);
    const candidateSaved = await saveCandidate(candidateToSave);
    console.log('candidateSaved ', candidateSaved);

    if (candidateSaved.error) return Promise.reject(candidateSaved.error);

    const report = await createReport({
        package:'driver_pro',
        candidate_id:candidateCreated.id
    });
    console.log('report  ', report);
    const reportCompleted = await getReport(report.id);
    console.log('reportCompleted  ', reportCompleted);
    const reportToSave = Object.assign({
        userId: state.user.id,
    }, reportCompleted);
    const reportSaved = await saveReport(reportToSave);
    console.log('reportSaved ', reportSaved);
    if (reportSaved.error) return Promise.reject(reportSaved.error);
})()
    .catch((error) => {
        console.log('error = ', error);
        return createLog({
            error,
            body: candidate,
            user:state.user
        });
    });
