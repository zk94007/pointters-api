const fs = require('fs');
const path = require('path');

const compose = require('koa-compose');

const routerPath = path.resolve(__dirname, './');
const routerNameRegex = /^.*router$/;
const Folder = fs.readdirSync(routerPath);
const routers = Folder.reduce((reducer, router) => {
  if (router === 'index.js') return reducer;
  const pathToService = path.resolve(routerPath, router);
  const routerFolder = fs.readdirSync(pathToService);
  const routerRouters = routerFolder
    .filter((possibleRouter) => routerNameRegex.test(possibleRouter))
    .map((possibleRouter) => {
      const pathToRouter = path.resolve(pathToService, possibleRouter);
      const routerToAttach = require(pathToRouter);
      return routerToAttach;
    });
  reducer.push(compose(routerRouters));
  return reducer;
}, []);

module.exports = compose(routers);
