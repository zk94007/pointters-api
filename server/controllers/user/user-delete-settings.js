const { unset } = require('../../../stores/user');

const errorMessageInRemoveSetting = 'Error in remove settings';

module.exports = async (ctx) => {
    const settings = ctx.request.body.fields.reduce((setting, field) => {
        setting[`settings.${field}`] = '';
        return setting;
    }, {});
    const userToRemoveSettings = ctx.queryToFindUserById;
    console.log('settings ', settings);
    const res = await unset(userToRemoveSettings, settings);
    console.log('res =', res);

    if (!res || res.error) ctx.throw(404, errorMessageInRemoveSetting);

    ctx.body = { success: true };
};
