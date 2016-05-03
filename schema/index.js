/**
 * Created by harry on 16/4/27.
 */
var Product = require('./collections/product');
var Order = require('./collections/order');
var productSupplier = require('./enum/productSupplier');
var productType = require('./enum/productType');
module.exports = function(schema){
	return {
		schema : {
			product: Product(schema),
			order: Order(schema)
		},
		enum : {
			productSupplier : productSupplier,
			productType : productType
		}
	};
}