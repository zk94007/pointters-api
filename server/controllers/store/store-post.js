const {address:{save: saveAddress}} = require('../../../services/shipping');
const { create } = require('../../../stores/store');

module.exports = async(ctx) => {
    const addressSaved = await saveAddress(ctx.request.body);
    if (!addressSaved || addressSaved.error) ctx.throw(404, "error creating store");

    const storeToCreate = Object.assign({
        userId: ctx.state.user.id
    },
    addressSaved
    );

    const doc = await create(storeToCreate);
    if (!doc || doc.error) ctx.throw(404, "error creating store");

    ctx.body = doc;
};
