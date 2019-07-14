const catchingErrorFromPromise = require('../../lib/catching-error-from-promise');
const Promise = require('bluebird');
const { map } = require('lodash');

module.exports = (client) => (query) => catchingErrorFromPromise(client
    .find(query,{isActive:0}).populate().exec()
    .then((_res) => {
    	let avgRating = 0, ratingCount = 0;

        const tempOrders = map(_res, (res) => {
                avgRating += res.overallRating;
                ratingCount ++;
                return res.overallRating;
            });
        if(ratingCount)
            avgRating /= ratingCount;
        else
            avgRating = 0;
        return avgRating;
    }));