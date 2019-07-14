const { paymentMethodFind } = require('../../../services/braintree');
const errorMsg = 'Error in getting payment method';

module.exports = async(ctx) => {
    const doc = await paymentMethodFind(ctx.params.paymentMethodToken);
    if (!doc || doc.error) ctx.throw(404, errorMsg);

    ctx.body = doc;
};
