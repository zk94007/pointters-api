const { update: update } = require('../../../stores/notification');

module.exports = async (ctx) => {
    const markedRead = {
      markedRead: true
    };

    const { error } = await update({ _id: ctx.params.idNotification }, markedRead);
    if (error) ctx.throw(404, error.message);

    ctx.body = { success: true };
};
