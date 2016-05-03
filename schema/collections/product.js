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
			required : true
		},
		supplier: {
			type : Number,
			required : true
		},
		productName : {
			type:String,
			unique : true,
			required : true
		},
		productDesc : {
			type:String,
		},
		keyword : {
			type:String,
		},
		quality : {
			type:Number,
			required : true
		},
		buyable: {
			type: Boolean,
		},
		price : {
			type:Number,
			required : true
		}
	}
};