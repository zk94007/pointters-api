const { findOne } = require('../../../stores/store');

const errorMsg = 'Error in get store';

module.exports = async (ctx) => {
    const query= { _id: ctx.params.idStore, isActive: true };
    const doc = await findOne(query);

    if (!doc || doc.error) ctx.throw(403, errorMsg);

    ctx.body = doc;
};
