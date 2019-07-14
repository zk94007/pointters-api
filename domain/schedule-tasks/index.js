const cron = require('cron').CronJob;

const checkEmailBounce = require('./check-email-bounces');
const checkEmailSpam = require('./check-email-bounces');
const checkEmailInvalid = require('./check-email-bounces');
const {schedule:{
    BounceEmail:scheduleTimeToCheckBounceEmail,
    SpamEmail:scheduleTimeToCheckSpamEmail,
    InvalidEmail:scheduleTimeToCheckInvalidEmail
}
} = require('../../config');

module.exports = () => {
    console.log('scheduleTimeToCheckBounceEmail',scheduleTimeToCheckBounceEmail);
    console.log('scheduleTimeToCheckSpamEmail',scheduleTimeToCheckSpamEmail);
    console.log('scheduleTimeToCheckInvalidEmail',scheduleTimeToCheckInvalidEmail);
    cron(scheduleTimeToCheckBounceEmail, checkEmailBounce);
    cron(scheduleTimeToCheckSpamEmail, checkEmailSpam);
    cron(scheduleTimeToCheckInvalidEmail, checkEmailInvalid);
};
