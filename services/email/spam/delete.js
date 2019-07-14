const sg = require('../client');

module.exports = async (bouncesToDelete) => {
    const requestToDeleteBounces = sg.emptyRequest({
        method: 'DELETE',
        path: '/v3/suppression/spam_reports',
        body: {
            emails: bouncesToDelete
        }
    });

    const {body: deleted} = await sg.API(requestToDeleteBounces);

    return deleted;
};
