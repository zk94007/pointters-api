module.exports = {
  apiName: 'Pointers-API-dev',
  compress: {
    threshold: 1024
  },
  dbpath: 'mongodb://127.0.0.1/pointters-api-dev1',
  easyPost: {
    ApiKey: 'y1ssBgKnItXIiHlu5McAEQ'
  },
  elasticsearch: {
      hosts: [ 'localhost:9200' ]
  },
  error: {
    stackTraceLimit: 12
  },
  jwt: {
    secret: 'pointers-secret-key',
    expiresIn: 3600000 * 24 * 365,
  },
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },
  fdlConfig: {
    web_api_key: "AIzaSyC_xo8o737Xt7h1WP6AXWHOiiUhcuEdPPw",
    dynamicLinkDomain: "pointters.page.link",
    server_url: "http://localhost:9000"
  },
  neo4j: {
      url: 'http://neo4j:Black1993@localhost:7474',
  },  
  optExpiresIn: 24 * 3600 * 1000,
  pagination: {
    requests: 2,
    serviceReviews: 2,
    offers: 2,
    postComments: 2,
    requestOffers: 2,
    categories: 2
  },
  port: 9000,
  rateLimit: 1000,
  rateLimitCalls: {
    duration: 3600000,
    max: 10000,
    blacklist: [],
    whitelist: []
  },
  redis: {
    url: 'redis://127.0.0.1:6379'
  },
  review: {
    minLengthForComment: 0
  }
};
