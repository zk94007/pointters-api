const { getJobs } = require('../../../controllers/request');
const body = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router
    .get('/jobs', validate({ body }), getJobs);

module.exports = router.routes();