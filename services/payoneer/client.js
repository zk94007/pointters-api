const Payoneer = require('payoneer-client');

const config = {
  "sandbox": true,
  "username": "USERNAME",
  "password": "PASSWORD",
  "partnerId": "PARTNERID"
};

const gateway = new Payoneer(config);

module.exports = gateway;