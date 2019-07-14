const {
  update,
  findOne,
  create,
  insert,
  findOneToken
} = require('../../../stores/fcm-token');
const {Types:{ObjectId}} = require('../../../databases/mongo');

const errorMessageInUpdateToken = 'Error in update token';
const errorFindingToken = 'Error finding token';


module.exports = async (ctx) => {


  let tokenToCreate = Object.assign({
      userId: ctx.state.user.id
    },
    {tokenItems: [ctx.request.body]}
  );

  //const findToken = await findOneToken({userId:ctx.state.user.id}, ctx.request.body);

  const findToken = await findOne({userId:ctx.state.user.id});
  console.log("Exist Token===========", findToken);

  if(!findToken){
    const token=await create(tokenToCreate);

    if (!token || token.error) ctx.throw(404, "Create Error");
    ctx.body = { success: true, token };

    console.log("token============",token);
    return;
  }
  
  const updatedtoken = await insert({userId:ctx.state.user.id}, {tokenItems: ctx.request.body});
  console.log("new token ===========",updatedtoken);


};
