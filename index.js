/**
 * Created by harry on 16/4/11.
 */
import React from 'react'
import {render, findDOMNode} from 'react-dom'
import readmin from 'readmin'
// 系统样式
import './css/app.css'
import './css/global.css'
import './css/treechart.css'
// 引用bootstrap css和js
import './node_modules/bootstrap/dist/css/bootstrap.css'
import './node_modules/bootstrap/dist/js/bootstrap.js'
import './node_modules/fixed-data-table/dist/fixed-data-table.css'

import Product from './components/product'
import Order from './components/order'

readmin({
	components: [
		{
			id: "product",
			text: "货品管理",
			component: Product
		},{
			id: "order",
			text: "订单管理",
			component: Order
		}
	],
	nav: [
		"product",
		"order"
	],
	componentDidMount: function () {

	},
	index: function () {
		return <div>test index</div>;
	},
	containerId: 'container'
});

