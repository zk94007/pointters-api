const { getExploreJobs } = require('../../../controllers/request');
const body = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router
    .get('/explore/jobs', validate({ body }), getExploreJobs);

module.exports = router.routes();
