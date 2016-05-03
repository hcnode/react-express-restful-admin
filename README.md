Example of React, express, RESTFul api, admin
 
## Feature

* React with webpack and babel
* Express as the web server
* Mongodb and mongoose with RESTFul api to maintain the data
* Simple admin UI with create, update, delete

## Usages

* `git clone https://github.com/hcnode/react-express-restful-admin`
* `cd react-express-restful-admin`
* `npm install`
* `npm run build`
* `npm run dev` (depend local mongodb)
* visit http://localhost:6002/

## About examples

* the example represent two models: product and order 
* schemes defined in `/schema/collections/`
* react router defined in `/index.js`
* react components defined in `/components/`
* mongoose model defined in `/server.js`
* that's all and roll it!

## Why there is no pagination?
[fixed-data-table](https://github.com/facebook/fixed-data-table) declare they can `Handling huge amounts of data`, so there is no pagination, as you believe or not

## Screenshot
![screenshot]()