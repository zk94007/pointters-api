const catchingErrorFromPromise = require('../../lib/catching-error-from-promise');

module.exports = (client) => (query) => catchingErrorFromPromise(
    client.countDocuments(query).exec()
);

/* To re-do below logic

const catchingErrorFromPromise = require('../../lib/catching-error-from-promise');
const Promise = require('bluebird');
const { map } = require('lodash');

module.exports = (client) => (query) => catchingErrorFromPromise(client
    .find(query,{isActive:0}).populate().exec()
    .then((_res) => {
    	let numOrders = 0;
        const tempOrders = map(_res, (res) => {
            if(res.orderMilestoneStatuses.completed)
            {
                numOrders ++;
            }
            return res.orderMilestoneStatuses.completed;
        });
        return numOrders;
    }));
    */
