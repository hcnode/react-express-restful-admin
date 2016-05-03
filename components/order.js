/**
 * Created by harry on 16/4/14.
 */
import React from 'react'
import commonTable from './commonTable'

import schema from '../schema'
import util from './util'

const Order = commonTable({
	fields : {
		schema : util.convertSchema(schema().schema.order),
		width : {
			oid : 50,
			pid : 50,
			quality : 100,
			price : 100
		},
		columns : [
			'oid', function (that, fields) {
				if(!fields.options.pid) {
					$.ajax({
						url: util.getUrl('/api/v1/product'),
						type: "GET",
						success: function (result) {
							var data = result;
							fields.options.pid = data.map(value => { return {text:value.productName, value : value.pid}});
							that.setState({options : fields.options});
						}
					});
					fields.options.pid = [];
				}
				return {
					name : 'pid',
					text : '货品名称'
				}
			}, 'quality', 'price'
		],
		editFields : [
			'pid',
			'quality',
			'price'
		],
		options : {

		},
		initNewModel : function () {
			return {

			}
		}
	},
	bind : {
	},
	api : {
		list : '/api/v1/order',
		create : '/api/v1/order',
		remove : '/api/v1/order',
		update : '/api/v1/order'
	}
});

export default Order