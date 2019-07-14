const { paymentMethodCreate } = require('../../../services/braintree');
const { update, findOne } = require('../../../stores/user');
const errorMsg = 'Error in creating payment method';

module.exports = async(ctx) => {

    const user = await findOne(ctx.queryToFindUserById);
    if(!user || user.error) ctx.throw(404, errorFindingUser);

    const customer = {
      firstName: user.firstName,
      lastName: user.lastName
    };
    if(!user.braintreeCustomerId) {
      const braintreeCustomerResult = await customerCreate(customer);
      const userCustomerId = {
        braintreeCustomerId: braintreeCustomerResult.customer.id
      };
      const { error } = await update(ctx.queryToFindUserById, userCustomerId);
      if (error) {
        ctx.throw(404, "Technical error in updating user's braintree customer id");
      }
    }

    const doc = await paymentMethodCreate(user.braintreeCustomerId, ctx.request.body.paymentMethodNonce, ctx.request.body.options);
    if (!doc || doc.error) ctx.throw(404, errorMsg);

    ctx.body = doc;
};
