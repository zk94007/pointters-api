const sg = require('../client');

module.exports = async (bouncesToDelete) => {
    const requestToDeleteBounces = sg.emptyRequest({
        method: 'DELETE',
        path: '/v3/suppression/bounces',
        body: {
            emails: bouncesToDelete
        }
    });

    const {body} = await sg.API(requestToDeleteBounces);

    return body;
};
