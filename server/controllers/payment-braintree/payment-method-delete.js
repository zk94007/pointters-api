const { paymentMethodDelete } = require('../../../services/braintree');
const errorMsg = 'Error in deleting payment method';

module.exports = async(ctx) => {
    const doc = await paymentMethodDelete(ctx.params.paymentMethodToken);
    if (!doc || doc.error) ctx.throw(404, errorMsg);

    ctx.body = doc;
};
