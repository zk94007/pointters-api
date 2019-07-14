const joi = require('joi');
const reasons = [ 'not_on_time', 'poor_quality_of_service', 'other' ];

module.exports = joi.object().keys({
    reason: joi.string().valid(reasons),
    message: joi.string()
});
