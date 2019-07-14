const domain = require('../domain');
const server = require('../server');


module.exports = () => {
    domain();
    server._start();
};
