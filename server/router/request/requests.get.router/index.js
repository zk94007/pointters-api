const { getRequests } = require('../../../controllers/request');
const body = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router
    .get('/requests', validate({ body }), getRequests);

module.exports = router.routes();