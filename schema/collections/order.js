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
			text : '货品名称'
		},
		quality : {
			type : Number,
			text : "份数"
		},
		price: {
			type: Number,
			text: "价格"
		}
	}
}