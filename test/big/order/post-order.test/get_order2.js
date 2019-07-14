const mongo = require('mongoose');
const {Types:{ObjectId}} = require('../../../../databases/mongo');

module.exports = () => ({
	paymentMethodToken:"cpnqfs",
	buyerId:ObjectId("5b7124fa9ac5b85ad3f68adb"),
	category: {
		id:ObjectId("5ab2468947255d1bd8fde80e"),
		name:"Furniture Assembly"
	},
	serviceId:ObjectId("5b70cb6e9ac5b85ad3f67618"),
	currencyCode:"USD",
	currencySymbol:"$",
	totalAmount:"30.00",
	orderItems:[{
		"_id":ObjectId("5b70cb6e9ac5b85ad3f6761c"),
		"currencyCode":"USD",
		"currencySymbol":"$",
		"description":"prepping, taping, priming, minor surface repairs, and inexpensive supplies such as tape and sp",
		"price":20,
		"time":1,
		"timeUnitOfMeasure":"hour",
		"quantity":1
	}],
	paymentMethod:{"method":"Visa"},
	servicesPrices:[{
		"_id":ObjectId("5b70cb6e9ac5b85ad3f6761c"),
		"currencyCode":"USD",
		"currencySymbol":"$",
		"description":"prepping, taping, priming, minor surface repairs, and inexpensive supplies such as tape and sp",
		"price":20,
		"time":1,
		"timeUnitOfMeasure":"hour",
		"quantity":1
	}],
	sellerId:ObjectId("5b70c9b49ac5b85ad3f675eb"),
	totalWorkDurationHours:1
});