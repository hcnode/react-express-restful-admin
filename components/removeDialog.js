/**
 * Created by harry on 16/4/12.
 */
import React from 'react'


const RemoveDialog = React.createClass({
	componentDidUpdate(){
		var that = this;
		if(this.props.model) {
			$("#listRemoveModal").modal('show');
			$('#listRemoveModal').on('hidden.bs.modal', function (e) {
				that.props.reset();
			})
		}
	},
	remove(){
		this.props.remove(this.props.model);
	},
	render(){
		if(this.props.model) {
			return <div className="modal fade" id="listRemoveModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h4 className="modal-title" id="removeConfirmLabel">删除记录</h4>
						</div>
						<div className="modal-body">
							确定删除记录
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-default" data-dismiss="modal"
									style={{marginRight: "5px;"}}>取消
							</button>
							<button className="btn btn-primary"
									onClick={this.remove}
									style={{marginRight: "5px;"}}>删除
							</button>
						</div>
					</div>
				</div>
			</div>
		}else{
			return <div></div>
		}
	}
});

export default RemoveDialog;