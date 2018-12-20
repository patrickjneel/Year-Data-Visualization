// Uses faker to get data (mock api).

// based on this response for "account" - pages/625934405/GET+Customer+Orders
const btoa = require('btoa');
const faker = require('faker');
const sample = require("lodash.sample");
const moment = require('moment');

const { productCollection } = require('./productsCollection');

const PRECISION = 0.01;

const boundingBoxArray = [
    {
        lat: {
          min: 39.18,
          max: 47.54
        },
        long: {
            min: -123.75,
            max: -93.164
        },
      name: 'US Main',
      featureCount: 1200
    },
    {
        lat: {
          min: -19.18,
          max: -31.54
        },
        long: {
            min: 115.75,
            max: 146.164
        },
      name: 'AUS Main',
      featureCount: 500
    },
    {
        lat: {
          min: -22.18,
          max: -37.54
        },
        long: {
            min: 139.75,
            max: 153.164
        },
      name: 'AUS Bottom',
      featureCount: 500
    },
    {
        lat: {
          min: -23.18,
          max: -33.54
        },
        long: {
            min: -48.75,
            max: -71.164
        },
      name: 'SA Bottom',
      featureCount: 500
    },
]

const generateCoordValue = (min, max) => {
  return faker.random.number({
    min,
    max,
    precision: PRECISION
  });
};


const order = (bbItem, date) => {
  let obj =
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [generateCoordValue(), generateCoordValue()]
        },
        "properties": {
          "accountNumber": faker.random.number(),
          "orderNumber": faker.random.number(),
          "createdDate": moment(date).format('M/DD/YYYY'),
          "userFirstName": faker.name.firstName(),
          "userLastName": faker.name.lastName(),
          "userEmail": faker.internet.email(),
          "products": [
            {
              "productId": faker.random.number(),
              "productName": btoa(sample(productCollection)),
            }
          ],
          "orderTotal": faker.commerce.price(22, 9000 , 2)
        }
      }


  return obj;
}


const generateOrders = (arr) => {
  let orders = [];
  var a = moment('2018-01-01');
  var b = moment('2018-12-31');

  for (let i = 0; i < Math.ceil(arr.featureCount/365); i++) {

    for (var m = moment(a); m.diff(b, 'days') <= 0; m.add(1, 'days')) {
      console.log(m.format('M/DD/YYYY'));
      orders.push(order(arr[i], m.format('M/DD/YYYY')));
    }
  }

  return orders;
}

// Run this from the terminal (cd into the generator directory)
// node index.js | pbcopy

const geoJsonTemplate = {
  "type": "FeatureCollection",
  "features": generateOrders(boundingBoxArray)
}


console.log(JSON.stringify(geoJsonTemplate));
