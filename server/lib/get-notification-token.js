const {
  create: createToken,
  findOne
} = require('../../stores/fcm-token');
const {Types:{ObjectId}} = require('../../databases/mongo');

module.exports = async (userId) => {

	console.log("notifcationUserId================", userId);
	
	const fcm_token = await findOne({userId:userId});

	console.log("find token error--------------",fcm_token);

	if(!fcm_token||fcm_token.error){
		return {token: [{deviceType:"", token:""}]};
	}

	if(fcm_token.tokenItems.length === 0){
		return {token: [{deviceType:"", token:""}]};
	}

	if(!fcm_token.tokenItems[0].hasOwnProperty('token')){
		return {token: [{deviceType:"", token:""}]};
	}


	// return {
 	//    token: fcm_token.token
 	//  };
	//console.log("fcm_token==========:",fcm_token);

	// var tokens = [];

	// fcm_token.tokenItems.forEach(function(item){
	// 	tokens.push(item.token);
	// })

	//console.log("token===array", fcm_token.tokenItems);

	return {token:fcm_token.tokenItems};

    
};