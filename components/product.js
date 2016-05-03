/**
 * Created by harry on 16/4/14.
 */
import React from 'react'
import commonTable from './commonTable'

import schema from '../schema'
import util from './util'

const Group = commonTable({
	fields : {
		schema : util.convertSchema(schema().schema.product),
		width : {
			pid : 50,
		},
		columns : [
			'pid','productName', 'productType'
		],
		editFields : [
			'productType',
			'supplier',
			'productName',
			'productDesc',
			'keyword',
			'quality',
			'buyable',
			'price'
		],
		options : {
			productType : schema().enum.productType,
			supplier : schema().enum.productSupplier
		},
		initNewModel : function () {
			return {
				// pid :uuid.v1(),
				// productType : '1',
				// productName : 'xxx'
			}
		}
	},
	bind : {
	},
	api : {
		list : '/api/v1/product',
		create : '/api/v1/product',
		remove : '/api/v1/product',
		update : '/api/v1/product'
		/*remove : row => {
			return {
				url : '/ngx-conf/group/remove.do',
				body : {
					group : row.name
				}
			};
		}*/
	}
});

export default Group