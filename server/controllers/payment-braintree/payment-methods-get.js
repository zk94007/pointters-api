const { customerCreate, customerFind } = require('../../../services/braintree');
const { update, findOne } = require('../../../stores/user');
const errorMsg = 'Error in getting payment methods';

module.exports = async(ctx) => {

    const user = await findOne(ctx.queryToFindUserById);
    if(!user || user.error) ctx.throw(404, errorFindingUser);
    const customer = {
      firstName: user.firstName,
      lastName: user.lastName
    };
    let braintreeCustomerResult = {};
    if(!user.braintreeCustomerId) {
      braintreeCustomerResult = await customerCreate(customer);
      if(!braintreeCustomerResult || braintreeCustomerResult.error) ctx.throw(404, errorMsg);

      const userCustomerId = {
        braintreeCustomerId: braintreeCustomerResult.customer.id
      };
      const { error } = await update(ctx.queryToFindUserById, userCustomerId);
      if (error) {
        ctx.throw(404, "Technical error in updating user's braintree customer id");
      }

      ctx.body = braintreeCustomerResult.paymentMethods;
    }else{
      braintreeCustomerResult = await customerFind(user.braintreeCustomerId);
      if(!braintreeCustomerResult || braintreeCustomerResult.error) ctx.throw(404, errorMsg);
      ctx.body = braintreeCustomerResult.paymentMethods;
    }

};
