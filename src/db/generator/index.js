// Uses faker to get data (mock api).

// based on this response for "account" - pages/625934405/GET+Customer+Orders
const btoa = require('btoa');
const faker = require('faker');
const sample = require("lodash.sample");
const moment = require('moment');

const {productCollection} = require('./productsCollection');

const PRECISION = 0.01;

const boundingBoxArray = [
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
        lp: 3
    },
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
        lp: 3
    },
    {
        lat: {
            min: 47,
            max: 54
        },
        long: {
            min: -122,
            max: -102
        },
        name: 'Canada Central',
        lp: 1
    },
    {
        lat: {
            min: 31,
            max: 40
        },
        long: {
            min: -81,
            max: -116
        },
        name: 'US East',
        lp: 2
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
        lp: 3
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
        lp: 4
    },
]

const generateCoordValue = (options) => {
    let {min, max} = options;
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
                "coordinates": [generateCoordValue(bbItem.long), generateCoordValue(bbItem.lat)]
            },
            "properties": {
                "accountNumber": faker.random.number(),
                "orderNumber": faker.random.number(),
                "createdDate": moment(date).format('M/D/YYYY'),
                "userFirstName": faker.name.firstName(),
                "userLastName": faker.name.lastName(),
                "userEmail": faker.internet.email(),
                "products": [
                    {
                        "productId": faker.random.number(),
                        "productName": btoa(sample(productCollection)),
                    }
                ],
                "orderTotal": faker.commerce.price(22, 9000, 2)
            }
        }


    return obj;
}


const generateOrders = (arr) => {
    let orders = [];
    var a = new Date('2018-01-01');
    var b = new Date('2018-12-31');

    arr.forEach((item) => {
        for (let i = 0; i < item.lp; i++) {
            //console.log(i)
            //console.log(item.lp)
            for (let m = moment(a); m.diff(b, 'days') <= 1; m.add(1, 'days')) {
                //console.log(moment(m).format('M/DD/YYYY'))

                orders.push(order(item, m));
            }
        }
    });


    return orders;
}

// Run this from the terminal (cd into the generator directory)
// node index.js | pbcopy

const geoJsonTemplate = () => {
    return {
        "type": "FeatureCollection",
        "features": generateOrders(boundingBoxArray)
    }
}


//geoJsonTemplate();
console.log(JSON.stringify(geoJsonTemplate()));
