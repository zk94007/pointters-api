const catchingErrorFromPromise = require('../../lib/catching-error-from-promise');

module.exports = (client) => (query) => catchingErrorFromPromise(client
    .find(query,{isActive:0}).populate().exec()
    .then((_res) => {
        
    	let avgOnTime  = 0, count = 0;
        if(_res.length > 0)
        {
            const tempOrders = map(_res, (res) => {
                    avgOnTime  += res.onTime ;
                    count ++;
                    return res.onTime;
                });
        }
        if(count > 0)
            avgOnTime /= count;
        return avgOnTime;
    }));