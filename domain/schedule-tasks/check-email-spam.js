const { get: getSpam, delete: deleteSpam } = require('../../services/email/spam');

const { updateEmailSpam: updateEmailSettingsOfUser } = require('../../stores/user');

module.exports = async() => {
    const spams = await getSpam();

    if (!spams.length) return;

    const spamsToDelete = await updateEmailSettingsOfUser(spams);

    if (!spamsToDelete.length) return;

    await deleteSpam(spamsToDelete);
};
