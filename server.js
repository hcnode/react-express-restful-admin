/*eslint-disable no-console, no-var */
var express = require('express')
var bodyParser = require('body-parser');
const restify = require('express-restify-mongoose')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
var _schema = require('./schema')(mongoose.Schema);
var autoIncrement = require('mongoose-auto-increment');
var uniqueValidator = require('mongoose-unique-validator');
var timestamps = require('mongoose-timestamp');


var app = express()
const router = express.Router()
app.use(bodyParser.json())
app.use(methodOverride())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"))

var connStr = 'mongodb://localhost/react-express-restful-admin';
var connection = mongoose.createConnection(connStr)
autoIncrement.initialize(connection);
mongoose.connect(connStr);

var productSchema = new mongoose.Schema(_schema.schema.product);
var orderSchema = new mongoose.Schema(_schema.schema.order);

// 设置pid字段自增长
productSchema.plugin(autoIncrement.plugin, {
  model: 'Product',
  field: 'pid',
  startAt: 100
});
orderSchema.plugin(autoIncrement.plugin, {
  model: 'Order',
  field: 'oid',
  startAt: 100
});
// 增加验证加了unique属性的字段验证
productSchema.plugin(uniqueValidator);
orderSchema.plugin(uniqueValidator);

productSchema.plugin(timestamps);
orderSchema.plugin(timestamps);
// restful model
restify.serve(router, mongoose.model('Product', productSchema));
restify.serve(router, mongoose.model('Order', orderSchema));
app.use(router)

app.listen(6002, function () {
  console.log('Server listening on http://localhost:6002, Ctrl+C to stop')
})
