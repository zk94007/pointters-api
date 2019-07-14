module.exports = {
    apiName: 'Pointers-API',
    angularSite: {
        url: 'http://pointters-angular.s3-website-us-east-1.amazonaws.com/',
    },
    dbpath: 'mongodb://admin2:i28hnKL__9hdjLKJI28hB@172.31.48.179/pointters-api-dev1?authSource=admin',
    easyPost:{
        ApiKey: 'y1ssBgKnItXIiHlu5McAEQ'
    },
    elasticsearch: {
        hosts: [ 'https://search-pointters-es-dev-cn37tjlkgx574lzojxb7esinzm.us-east-1.es.amazonaws.com' ]
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
        server_url: "http://www.pointters.com"
      },
    neo4j: {
        url: 'http://neo4j:123456@34.238.50.117:7474',
    },
    optExpiresIn: 24 * 3600 * 1000,
    pagination: {
        requests: 100,
        offers: 100,
        postComments:100,
        requestOffers:100,
        categories:100,
        serviceReviews:100
    },
    port: 9000,
    rateLimit: 1000,
    rateLimitCalls:{
        duration: 3600000,
        max: 10000,
        blacklist: [],
        whitelist: []
    },
    redis:{
        url:'redis://b50e96d949057555a44754a5ce5443ac@pointtersdev-redis.du4mal.0001.use1.cache.amazonaws.com:6379'
    },
    review: {
        minLengthForComment: 100
    }
};
