const { get: getBounces, delete: deleteBounces } = require('../../services/email/bounce');

const { updateEmailBounce: updateEmailSettingsOfUser } = require('../../stores/user');
module.exports = async() => {
    const bounces = await getBounces();
    if (!bounces.length) return;

    const bouncesToDelete = await updateEmailSettingsOfUser(bounces);

    if (!bouncesToDelete.length) return;

    await deleteBounces(bouncesToDelete);
};
