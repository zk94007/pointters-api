const {
  pushNotification
} = require('../../../controllers/push-notification');

const validate = require('koa2-validation');
const schema = require('./body-schema');
const Router = require('koa-router');
const router = new Router();

// router.post('/push-notification', (ctx, next) => {
//   console.log('Push Notification called!');
// });

router.post('/push-notification', validate({
  body: schema
}), pushNotification);

module.exports = router.routes();
