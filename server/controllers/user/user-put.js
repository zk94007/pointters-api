const { update, findOne } = require('../../../stores/user');
const { customerCreate, customerFind } = require('../../../services/braintree');
const {
  email: {
    sendEmail
  }
} = require('../../../services');

const errorMessageInUpdateUser = 'Error in update user';
const errorFindingUser = 'Error finding user';
const dynamicLink = require('../../../services/dynamic-link');

module.exports = async (ctx) => {
    const data = ctx.request.body;
    data.createdAt = new Date().toString();

    // create dynamic link
  
      const shareLink = await dynamicLink(`/profile/${ctx.queryToFindUserById}`);
      data.shareLink = shareLink;



    const user = await findOne(ctx.queryToFindUserById);
    if(!user || user.error) ctx.throw(404, errorFindingUser);

  

    const customer = {
      firstName: data.firstName,
      lastName: data.lastName
    };
    if(!user.braintreeCustomerId) {
      const braintreeCustomerResult = await customerCreate(customer);
      if (braintreeCustomerResult) data.braintreeCustomerId = braintreeCustomerResult.customer.id;
    }
    const { error } = await update(ctx.queryToFindUserById, data);

    if (error) {
      ctx.throw(404, data);
    }

    ctx.status = 200;
    ctx.body = { success: true };

    //console.log(data);


    //await sendEmail(__user.email, 'Welcome', 'Welcome to registeration');
};
