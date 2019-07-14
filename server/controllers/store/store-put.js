const {address:{save: saveAddress}} = require('../../../services/shipping');
const { update } = require('../../../stores/store');

module.exports = async (ctx) => {

    let address = ctx.request.body;
    if (address.id) delete address.id;
    if (address._id) delete address._id;
    const addressSaved = await saveAddress(address);
    if (!addressSaved || addressSaved.error) ctx.throw(404, "error updating store");
    if (addressSaved.id) delete addressSaved.id;

    const doc = await update({ _id: ctx.params.idStore }, addressSaved);
    if (!doc || doc.error) ctx.throw(404, "error updating store");

    ctx.body = doc;

};
