const Promise = require('bluebird');
const { map } = require('lodash');
const { paginate: paginateServices } = require('../../../../stores/service');
const { findOne: findUser } = require('../../../../stores/user');
const { numOrders, find: findOrders, paginate: paginateOrders } = require('../../../../stores/order');
const { avgRating } = require('../../../../stores/service-review');
const { count: countShares } = require('../../../../stores/service-share');
const { Types: { ObjectId } } = require('../../../../databases/mongo');
const getQuery = require('./get-query');
const errorMessage = 'Error in find service';

module.exports = async(ctx) => {
  /*  const {query,options} = getQuery(ctx);
    const services = await paginateServices( query, options );
    if (services.total == 0 || services.error) {
        ctx.throw(404, 'No service found');
    } */

    let banner = [
      {
        type:"category",
        image:"https://s3.amazonaws.com/pointters_dev/dev/bbb06bbf-1c10-4706-8071-c162173d76a4",
        icon:"icon url",
        title:"Home Services",
        subTitle:"100 Local | 128 Online"
      },
      {
        type:"category",
        image:"https://s3.amazonaws.com/pointters_dev/dev/bbb06bbf-1c10-4706-8071-c162173d76a4",
        icon:"icon url",
        title:"Home Services",
        subTitle:"100 Local | 128 Online"
      }
    ];

    let section2 = {
      title:"Popular Categories",
      docs:[
        {
          type:"category",
          image:"https://s3.amazonaws.com/pointters_dev/dev/bbb06bbf-1c10-4706-8071-c162173d76a4",
          title:"Tutoring",
          subTitle:"1.1k services"
        },
        {
          type:"category",
          image:"https://s3.amazonaws.com/pointters_dev/dev/bbb06bbf-1c10-4706-8071-c162173d76a4",
          title:"Dog Care",
          subTitle:"950 services"
        }
      ]
    }

    let section3 = {
      title:"Featured Style",
      docs:[
        {
          type:"service",
          serviceId:"5abb66ab7a8c5d6c43e39cec",
          image:"https://s3.amazonaws.com/pointters_dev/dev/bbb06bbf-1c10-4706-8071-c162173d76a4",
          description:"Local Moving and Arrangement",
          name:"Jacqueline W.",
          price: {
              "currencyCode": "USD",
              "currencySymbol": "$",
              "description": "huui",
              "price": 40,
              "time": 1,
              "timeUnitOfMeasure": "hour"
          },
          pointValue: "90",
          numOrders: "100",
          avgRating: "96"
        },
        {
          type:"service",
          serviceId:"5abb66ab7a8c5d6c43e39cec",
          image:"https://s3.amazonaws.com/pointters_dev/dev/bbb06bbf-1c10-4706-8071-c162173d76a4",
          description:"Local Moving and Arrangement",
          name:"Jacqueline W.",
          price: {
              "currencyCode": "USD",
              "currencySymbol": "$",
              "description": "huui",
              "price": 40,
              "time": 1,
              "timeUnitOfMeasure": "hour"
          },
          pointValue: "90",
          numOrders: "100",
          avgRating: "96"
        }
      ]
    }

    let section4 = {
      title:"Featured Style",
      docs:[
        {
          type:"service",
          serviceId:"5abb66ab7a8c5d6c43e39cec",
          name:"Jacqueline W.",
          media:{
            "mediaType": "image",
            "fileName": "https://s3.amazonaws.com/pointters_dev/dev/bbb06bbf-1c10-4706-8071-c162173d76a4"
          },
          description:"House cleaning service",
          price: {
              "currencyCode": "USD",
              "currencySymbol": "$",
              "description": "huui",
              "price": 40,
              "time": 1,
              "timeUnitOfMeasure": "hour"
          }
        },
        {
          type:"service",
          serviceId:"5abb66ab7a8c5d6c43e39cec",
          name:"Rebecca Adams",
          media:{
            "mediaType": "image",
            "fileName": "https://s3.amazonaws.com/pointters_dev/dev/bbb06bbf-1c10-4706-8071-c162173d76a4"
          },
          description:"Private Yoga instructions",
          price: {
              "currencyCode": "USD",
              "currencySymbol": "$",
              "description": "huui",
              "price": 40,
              "time": 1,
              "timeUnitOfMeasure": "hour"
          }
        },
        {
          type:"service",
          serviceId:"5abb66ab7a8c5d6c43e39cec",
          name:"Samuel Dixon",
          media:{
            "mediaType": "image",
            "fileName": "https://s3.amazonaws.com/pointters_dev/dev/bbb06bbf-1c10-4706-8071-c162173d76a4"
          },
          description:"Anniversary Wedding Planning",
          price: {
              "currencyCode": "USD",
              "currencySymbol": "$",
              "description": "huui",
              "price": 24,
              "time": 1,
              "timeUnitOfMeasure": "hour"
          }
        }
      ]
    }

    let section5 = {
      title:"Featured Style",
      docs:[
        {
          type:"service",
          serviceId:"5abb66ab7a8c5d6c43e39cec",
          name:"Rebecca Adams",
          media:{
            "mediaType": "image",
            "fileName": "https://s3.amazonaws.com/pointters_dev/dev/bbb06bbf-1c10-4706-8071-c162173d76a4"
          },
          description:"Private yoga classes for beginners"
        },
        {
          type:"service",
          serviceId:"5abb66ab7a8c5d6c43e39cec",
          name:"Rebecca Adams",
          media:{
            "mediaType": "image",
            "fileName": "https://s3.amazonaws.com/pointters_dev/dev/bbb06bbf-1c10-4706-8071-c162173d76a4"
          },
          description:"Private Yoga instructions"
        }
      ]
    }

    let section6 = {
      title:"Browse Categories",
      docs:[
        {
          type:"category",
          image:"https://s3.amazonaws.com/pointters_dev/dev/bbb06bbf-1c10-4706-8071-c162173d76a4",
          title:"Wellness",
          subTitle:"128 Services"
        },
        {
          type:"category",
          image:"https://s3.amazonaws.com/pointters_dev/dev/bbb06bbf-1c10-4706-8071-c162173d76a4",
          title:"Pets",
          subTitle:"34 Services"
        },
        {
          type:"category",
          image:"https://s3.amazonaws.com/pointters_dev/dev/bbb06bbf-1c10-4706-8071-c162173d76a4",
          title:"Business",
          subTitle:"345 Services"
        },
        {
          type:"category",
          image:"https://s3.amazonaws.com/pointters_dev/dev/bbb06bbf-1c10-4706-8071-c162173d76a4",
          title:"Legal",
          subTitle:"30 Services"
        }
      ]
    }

    let section7 = {
      title:"Featured Sellers",
      docs:[
        {
          type:"user",
          userId:"5a029988b37404568cb6f1f5",
          image:"https://s3.amazonaws.com/pointters_dev/dev/bbb06bbf-1c10-4706-8071-c162173d76a4",
          name:"Christ J.",
          subTitle:"Photographer"
        },
        {
          type:"user",
          userId:"5a029988b37404568cb6f1f5",
          image:"https://s3.amazonaws.com/pointters_dev/dev/bbb06bbf-1c10-4706-8071-c162173d76a4",
          name:"Andria W.",
          subTitle:"Designer"
        },
        {
          type:"user",
          userId:"5a029988b37404568cb6f1f5",
          image:"https://s3.amazonaws.com/pointters_dev/dev/bbb06bbf-1c10-4706-8071-c162173d76a4",
          name:"Chelsy L.",
          subTitle:"Plumber"
        },
        {
          type:"user",
          userId:"5a029988b37404568cb6f1f5",
          image:"https://s3.amazonaws.com/pointters_dev/dev/bbb06bbf-1c10-4706-8071-c162173d76a4",
          name:"Keanu W.",
          subTitle:"Producer"
        }
      ]
    }

    ctx.status = 200;
    ctx.body = {
      banner: banner,
      section2: section2,
      section3: section3,
      section4: section4,
      section5: section5,
      section6: section6,
      section7: section7
    };
};
