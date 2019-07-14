const { paymentMethodUpdate } = require('../../../services/braintree');
const errorMsg = 'Error in updating payment method';

module.exports = async(ctx) => {
    const doc = await paymentMethodUpdate(ctx.params.paymentMethodToken, ctx.request.body);
    if (!doc || doc.error) ctx.throw(404, errorMsg);

    ctx.body = doc;
};
