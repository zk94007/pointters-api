const { get: getInvalid, delete: deleteInvalid } = require('../../services/email/invalid');

const { updateEmailInvalid: updateEmailSettingsOfUser } = require('../../stores/user');

module.exports = async () => {
    const spams = await getInvalid();

    if (!spams.length) return;

    const spamsToDelete = await updateEmailSettingsOfUser(spams);

    if (!spamsToDelete.length) return;

    await deleteInvalid(spamsToDelete);
};
