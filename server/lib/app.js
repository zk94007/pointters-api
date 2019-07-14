const Koa = require('koa');
const cors = require('@koa/cors');
const jwt = require('./middelwares/jwt');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const auth = require('./middelwares/auth');
const errors = require('./middelwares/errors');
const session = require('koa-session');
const cookie = require('./middelwares/cookie');
const getQueries = require('./middelwares/attach-queries');
const timeout = require('koa-timeout-v2');
// const rateLimit = require('./middelwares/rate-limit');
const compress = require('./middelwares/compress');

const {
  jwt: {
    secret,
    expiresIn: maxAge
  },
  timeout: {
    apiTimeout,
    timeoutOptions
  },
  pathUnprotected,
} = require('../../config');

const app = new Koa();
app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.keys = [secret];
app.use(errors());
// app.use(rateLimit());
app.use(compress());
app.use(logger());
app.use(timeout(apiTimeout, timeoutOptions));
app.use(cookie.unless(pathUnprotected));
app.use(session({
  maxAge
}, app));
app.use(jwt.unless(pathUnprotected));
app.use(getQueries.unless(pathUnprotected));
app.use(auth.unless(pathUnprotected));
app.use(bodyParser({
  formLimit: '5mb',
  jsonLimit: '5mb',
  textLimit: '5mb'
}));
module.exports = app;
