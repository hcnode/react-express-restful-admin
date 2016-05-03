/**
 * Created by harry on 16/4/13.
 */

import React from 'react'
import {render, findDOMNode} from 'react-dom'
import {Table, Column, Cell} from 'fixed-data-table';
import EditDialog from './editDialog'
import RemoveDialog from './removeDialog'
import moment from 'moment'
import util from './util'
// notifications
import '../css/bootstrap-notify.css'
import '../js/bootstrap-notify.js'

export default config => {
	const fields = config.fields;
	const api = config.api;
	const bind = config.bind;
	const extendToolbar = config.extendToolbar || function(){return null}
	

	return React.createClass({
		getData(){
			const that = this;
			if(typeof api.list == "function"){
				api.list(that, (data) => {
					that.setState({rows: data});
				});
			}else {
				fetch(util.getUrl(api.list)).then(result => {
					result.json().then(data => {
						that.setState({rows: data});
					});
				});
			}
		},
		bindThis(){
			const that = this;
			if(bind){
				Object.keys(bind).forEach(value => that[value] = bind[value].bind(that))
			}
		},
		getInitialState() {
			const that = this;
			this.bindThis();
			setTimeout(() => {
				that.getData();
			}, 0);
			return {
				rows : [],
				extraContent : null,
				options : {}
			};
		},
		getValue(field, value){
			if(!value) return '';
			if(field.type == 'date'){
				return value == -1 ? '-' : moment(value).format('YYYY-MM-DD hh:mm:ss');
			}else if(fields.options && fields.options[field.name]){
				return fields.options[field.name].find(option => option.value == value).text;
			}else{
				return typeof value == 'boolean' ? value ? 'Yes' : 'No' : value;
			}
		},
		getColumns(){
			var that = this;
			var result = fields.columns.map(field => {
				var item = typeof field == "function" ? field(that, fields) : fields.schema.find(item => {
					if(item.name == field) return item;
				});
				var width = fields.width[field];
				return <Column
						header={<Cell>{item.text || item.name}</Cell>}
						cell={(cell, ...props) => {
					return <Cell {...props}>
					  {this.getValue(item, this.state.rows[cell.rowIndex][item.name])}
					</Cell>
				  }}
					width={width || 200}
				/>
			});
			result.push(<Column
				header={<Cell>操作</Cell>}
				cell={(cell, ...props) => {
					return <Cell>
						{ api.remove ? <i
							style={{cursor:"pointer"}}
							onClick={() => this.setState({removeModel:this.state.rows[cell.rowIndex]})}
							className="glyphicon glyphicon-remove"
							title="删除"
							aria-hidden="true" /> : null} &nbsp;&nbsp;
						{ api.update ? <i
							style={{cursor:"pointer"}}
							onClick={() => this.setState({editModel:this.state.rows[cell.rowIndex]
											, editSchema: fields.editFields.map(field => fields.schema.find(value => value.name == field))})}
							className="glyphicon glyphicon-cog"
							title="修改"
							aria-hidden="true"/> : null} &nbsp;&nbsp;
						{
							config.operate ? config.operate(this, cell) : null
						}
					</Cell>
			  }}
				width={100}
			/>);
			return result;
		},
		showError(result){
			var text = typeof result == "string" ? result : msg
			var regUnique = /expected `(.+?)` to be unique/;
			var reqRequire = /"Path `(.+?)` is required."/;
			var msg = JSON.stringify(result.responseJSON.errors);
			var regField = regUnique.test(msg) && RegExp.$1;
			if(regField){
				text = (fields.schema.find(field => field.name == regField).text || regField) + " 不能重复";
			}else {
				regField = reqRequire.test(msg) && RegExp.$1;
				if (regField) {
					text = (fields.schema.find(field => field.name == regField).text || regField) + " 为必填";
				}
			}
			$('.top-right').notify({
				message: { text:  text}
			}).show();
		},
		remove(row){
			const that = this;
			var url;
			if(typeof api.remove == "function"){
				return api.remove(row);
			}else{
				url =  api.remove;
			}
			$.ajax ({
				url: util.getUrl(url + '/' + row._id),
				type: "DELETE",
				success: function(){
					$("#listRemoveModal").modal('hide');
					setTimeout(
						function(){
							that.getData();
						}
					, 300);
				},
				error:function (result) {
					that.showError(result)
				}
			});
		},
		create(){
			var state = {editSchema: fields.editFields.map(field => fields.schema.find(value => value.name == (field.name || field)))};
			if(fields.initNewModel){
				state.editModel = fields.initNewModel();
			}
			this.setState(state);
		},
		save(model){
			const that = this;
			var url, body;
			if(typeof api.create == "function"){
				var apiCustom = api.create(model);
				url = apiCustom.url;
				body = apiCustom.body;
			}else{
				url = api.create;
				body = model;
			}
			var requireField = fields.schema.find(field => field.required && !body[field.name]);
			if(requireField){
				return that.showError('请输入“'+ (requireField.text || requireField.name) +'”');
			}
			$.ajax ({
				url: util.getUrl(url + ('_id' in model ? ('/' + model._id) : '')),
				type: '_id' in model ? "PATCH" : "POST",
				data: JSON.stringify(body),
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				success: function(){
					that.setState({forceRefresh : true});
					that.getData();
					$("#listEditModal").modal('hide');
					that.setState({editSchema : null});
				},
				error:function (result) {
					that.showError(result)
				}
			});
			/*$.post(util.getUrl(url), body)
			.done(result => {
				this.setState({forceRefresh : true});
				that.getData();
				$("#listEditModal").modal('hide');
				this.setState({editSchema : null});
			})
			.fail(result => {
				that.showError(result)
			});*/
		},
		getCommonDialog(title, content, buttons){
			return <div className="modal fade" id="commonModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
				<div className="modal-dialog modal-lg" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h4 className="modal-title">{title}</h4>
						</div>
						<div className="modal-body">
							{
								content
							}
						</div>
						<div className="modal-footer">
							{
								buttons
							}
						</div>
					</div>
				</div>
			</div>
		},
		render() {
			return <div>
				<div style={{marginBottom:"10px"}}>
					{api.create ? <button className="btn btn-primary" onClick={this.create}>添加</button> : null}
					{
						extendToolbar(this)
					}
				</div>
				<Table
					rowHeight={35}
					rowsCount={this.state.rows.length}
					width={1000}
					height={500}
					headerHeight={40}>
					{this.getColumns()}
				</Table>
				<EditDialog
					schema={this.state.editSchema}
					fields={fields}
					save={this.save}
					model={this.state.editModel}
					reset={() => this.setState({editSchema:null})}
				/>
				<RemoveDialog
					model={this.state.removeModel}
					fields={fields}
					remove={this.remove}
					reset={() => this.setState({removeModel:null})}
				/>
				<div>
					{
						this.state.extraContent
					}
				</div>
			</div>
		}
	})
}