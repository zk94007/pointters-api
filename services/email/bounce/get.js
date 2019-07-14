const sg = require('../client');

module.exports = async () => {
    const requestToGetBounces = sg.emptyRequest({
        method: 'GET',
        path: '/v3/suppression/bounces',
    });

    const {body:bounces} = await sg.API(requestToGetBounces);
    return bounces;
};
