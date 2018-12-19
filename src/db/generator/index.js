// Uses faker to get data (mock api).

// based on this response for "account" - pages/625934405/GET+Customer+Orders
const btoa = require('btoa');
const faker = require('faker');
const sample = require("lodash.sample");
const moment = require('moment');

const { productCollection } = require('./productsCollection');

// use the mongoose adapter as the default adapter

const getLong = () => {
  return faker.random.number({
    'min': -121.46,
    'max': -81,
    'precision': 0.01
  });
};

const getLat = () => {
  return faker.random.number({
    'min': 35.05,
    'max': 53,
    'precision': 0.01
  });
}

const order = () => {
  let obj = 
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [getLong(), getLat()]
        },
        "properties": {
          "accountNumber": faker.random.number(),
          "orderNumber": faker.random.number(),
          "createdDate": moment(faker.date.between('2018-01-01', '2018-12-31')).format('M/DD/YYYY'),
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


const listAccounts = (n) => {

  let orders = [];
  for (i = 0; i <= n; i++) { 
    orders.push(order());
  }

  return orders;
}

// Run this from the terminal (cd into the generator directory)
// node index.js | pbcopy

const geoJsonTemplate = {
  "type": "FeatureCollection",
  "features": listAccounts(1800)
}


console.log(JSON.stringify(geoJsonTemplate));
