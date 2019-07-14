const { generateClientToken, customerCreate, customerFind } = require('../../../services/braintree');
const { findOne, update } = require('../../../stores/user');
const errorMsg = 'Error in generating client token';

module.exports = async (ctx) => {
    const user = await findOne(ctx.queryToFindUserById);
    if (!user || user.error) ctx.throw(404, "invalid user");

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
        ctx.throw(404, "Error in update user's braintreeCustomerId");
      }
    }else{
      const braintreeCustomerResult = await customerFind(user.braintreeCustomerId);
    }

    const doc = await generateClientToken(user.braintreeCustomerId);
    if (!doc || doc.error) ctx.throw(403, errorMsg);

    ctx.body = doc;
};
