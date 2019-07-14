const routers = require('../router');

module.exports = (app) => {
  app.use(routers);
};
