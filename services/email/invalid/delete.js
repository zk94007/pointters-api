const sg = require('../client');

module.exports = async (bouncesToDelete) => {
    const requestToDeleteBounces = sg.emptyRequest({
        method: 'DELETE',
        path: '/v3/suppression/invalid_emails',
        body: {
            emails: bouncesToDelete
        }
    });

    const {body: deleted} = await sg.API(requestToDeleteBounces);

    return deleted;
};
