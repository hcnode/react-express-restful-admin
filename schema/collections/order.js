/**
 * Created by harry on 16/4/28.
 */
module.exports = function(Schema) {
	return {
		oid : {
			type : Number
		},
		pid : {
			type : Number,
			ref : "Product",
		},
		quality : {
			type : Number,
		},
		price: {
			type: Number,
		}
	}
}