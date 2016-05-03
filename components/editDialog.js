/**
 * Created by harry on 16/4/12.
 */
import React from 'react'


const EditDialog = React.createClass({
	getInitialState() {
		return {
			fields : {},
			model : this.props.model || {}
		}
	},
	componentDidUpdate(){
		const that = this;
		if(this.props.schema) {
			$("#listEditModal").modal('show');
			$('#listEditModal').on('hidden.bs.modal', function (e) {
				that.props.reset();
			})
		}
	},
	getField(field){
		const that = this;
		var fields = that.props.fields;
		var options = fields.options[field.name];
		const id = '_field_' + field.name;
		setTimeout(function () {
			var value = that.props.model[field.name];
			if(field.type == 'bool'){
				$('#_field_' + field.name)[0].checked = value;
			}else {
				$('#_field_' + field.name).val(value);
			}
		},300);
		if(options){
			var fieldState = (that.state.fields[field.name] || {}).options || options;
			if(typeof fieldState == 'object'){
				return <select className="form-control" id={id} ref={field.name} onChange={(event) => {
						if(field.onChange){
							field.onChange(that, event);
						}
					}}>
					<option value="">请选择</option>
					{
						fieldState.map(option => <option value={option.value}>{option.text}</option>)
					}
				</select>
			}/*else {
				if (typeof fieldState == 'function') {
					fieldState(that, items => {
						var editFields = that.state.fields;
						editFields[field.name] = editFields[field.name] || {};
						editFields[field.name].options = items;
						that.setState({fields: editFields});
					});
					return null;
				}
			}*/
		}else if(field.type == 'bool'){
			return <div className="checkbox">
				<label>
					<input
						type="checkbox"
						id={id}
						ref={field.name}
						value="" />
				</label>
			</div>
		}else{
			return <input
				type="text"
				className="form-control"
				id={id}
				ref={field.name}/>
		}

	},
	getFields(){
		var result = this.props.schema.reduce((result, field) => {
			var pairIsFull = this.pairIsFull;
			if (pairIsFull) {
				this.pairIsFull = false;
				result.push(<div className="form-group">
					{this.first}
					<label
						className="col-sm-2 control-label">{field.text || field.name}</label>
					<div className="col-sm-4">
						{
							this.getField(field)
						}
					</div>
				</div>)
				this.first = null;
				result.push(<div className="line line-dashed b-b line-lg "></div>);
			} else {
				this.pairIsFull = true;
				this.first = [];
				this.first.push(<label
					className="col-sm-2 control-label">{field.text || field.name}</label>);
				this.first.push(<div className="col-sm-4">
					{
						this.getField(field)
					}
				</div>);
			}
			return result;
		}, []);
		if(this.first){
			result.push(<div className="form-group">{this.first}</div>)
			result.push(<div className="line line-dashed b-b line-lg "></div>);
			this.first = null;
			this.pairIsFull = false;
		}
		return result;
	},
	save(){
		var model = Object.keys(this.refs).reduce((tmp, value) => {
			var control = this.refs[value];
			tmp[value] = control.type == 'checkbox' ? control.checked : control.value;
			return tmp;
		}, {});

		this.props.save($.extend({}, this.props.model, model));
	},
	render(){
		if(this.props.schema) {
			return <div className="modal fade" id="listEditModal" tabindex="-1" role="dialog"
						aria-labelledby="myModalLabel" style={{paddingLeft: "0px;"}}>
				<div className="modal-dialog modal-lg" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
								aria-hidden="true">×</span></button>
							<h4 className="modal-title" id="myModalLabel">新增/修改记录</h4>
						</div>
						<div className="modal-body form-horizontal">
							<ul className="nav nav-tabs" role="tablist">
								<li role="presentation" className="active">
									<a href="#basicInfo"
									   aria-controls="basicInfo"
									   role="tab"
									   data-toggle="tab">基本信息</a>
								</li>
							</ul>
							<div className="panel panel-default" style={{borderTop:"0px;"}}>
								<div className="panel-body">
									<div id="myTabContent" className="tab-content">
										<div role="tabpanel" className="tab-pane  in active" id="basicInfo"
											 aria-labelledby="basicInfo-tab">
											{
												this.getFields()
											}
										</div>
									</div>
								</div>
								<footer className="panel-footer text-right bg-light lter">
									<button type="button" className="btn btn-default" data-dismiss="modal"
											style={{marginRight: "5px;"}}>取消
									</button>
									<button className="btn btn-primary"
											onClick={this.save}
											style={{marginRight: "5px;"}}>保存
									</button>
								</footer>
							</div>
						</div>

					</div>
				</div>
			</div>
		}else{
			return <div></div>
		}
	}
});

export default EditDialog;