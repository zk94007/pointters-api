const Promise = require('bluebird');
const { dropWhile, map } = require('lodash');
const { storeSchema } = require('../../../stores/service/client');
const { findOne: findOneService } = require('../../../stores/service');
const { numOrders } = require('../../../stores/order');
const { count: countShares } = require('../../../stores/service-share');
const { avgRating } = require('../../../stores/service-review');
const { findOne: findOneUser } = require('../../../stores/user');
const { Types:{ObjectId} } = require('../../../databases/mongo');

module.exports = async (ctx) => {

    let results = {
      popularCategories: [
        {
          icon: "icon url",
          id: "123",
          name: "Photographer"
        },
        {
          icon: "icon url",
          id: "124",
          name: "Entertainer"
        },
        {
          icon: "icon url",
          id: "125",
          name: "Wedding Planner"
        }
      ],
      recentSearches: [
        {
          query: "dog",
          location:{
              "state": "WI",
              "city": "Franklin",
              "postalCode": "53132",
              "geoJson": {
                  "type": "Point",
                  "coordinates": [
                      -87.95483601103824,
                      42.91793560940367
                  ]
              },
              "province": "Milwaukee",
              "country": "United States"
          },
          category: {
            id: "123",
            name: "dog care"
          },
          filter: {
            featured: true,
            popular: true,
            local: true,
            online: false,
            new: true,
            services: true,
            users: false,
            jobs: false
          }
        }
      ]
    };

    ctx.status = 200;
    ctx.body = results;
};
