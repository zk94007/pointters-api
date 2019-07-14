const sg = require('../client');

module.exports = async () => {
    const requestToGetBounces = sg.emptyRequest({
        method: 'GET',
        path: '/v3/suppression/spam_reports',
    });

    const {body:spam} = await sg.API(requestToGetBounces);
    return spam;
};
