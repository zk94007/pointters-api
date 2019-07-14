const catchingErrorFromPromise = require('../../lib/catching-error-from-promise');
const Promise = require('bluebird');
const { map } = require('lodash');

module.exports = (client) => (query) => catchingErrorFromPromise(client
    .find(query,{isActive:0}).populate().exec()
    .then((_res) => {
    	let avgQuality  = 0, count = 0;

        const tempOrders = map(_res, (res) => {
                avgQuality  += res.qualityOfService ;
                count ++;
                return res.qualityOfService;
            });
        if(count)
            avgQuality  /= count;
        else
            avgQuality  = 0;
        return avgQuality ;
    }));