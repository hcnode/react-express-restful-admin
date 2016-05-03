/**
 * Created by harry on 16/4/27.
 */

module.exports = function(Schema){
	return {
		pid : {
			type : Number
		},
		productType: {
			type : Number,
			text : "货品类型",
			required : true
		},
		supplier: {
			type : Number,
			text : "供应商",
			required : true
		},
		productName : {
			type:String,
			unique : true,
			text : "货品名称",
			required : true
		},
		productDesc : {
			type:String,
			text : "货品描述"
		},
		keyword : {
			type:String,
			text : "关键字"
		},
		quality : {
			type:Number,
			text : "数量",
			required : true
		},
		buyable: {
			type: Boolean,
			text: "是否可以购买"
		},
		price : {
			type:Number,
			text : "价格",
			required : true
		}
	}
};