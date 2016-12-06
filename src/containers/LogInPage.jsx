import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { TextField, RaisedButton, Avatar } from 'material-ui'
import Peer from 'peerjs'

import * as userActions from '../actions/UserActions';
import * as logActions from '../actions/LogActions';
import * as connActions from '../actions/ConnActions';
import * as historyActions from '../actions/historyActions';

class LogInPage extends Component {

	// constructor() {

	// 	this.logMsg = this.props.logActions.addLog;
	// 	this.logMsg('App started!');
	// }

	handleNameChange = (event) => {
		this.props.userActions.setUserName(event.target.value.trim());
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.connectToServer();
		browserHistory.push('/main/users_list');
	}

	connectToServer = () => {
		const conn = new Peer(this.props.user.name, {key: 'byr21psbtd3d6lxr'});
		this.props.connActions.setPeerConn(conn);
	}

	render() {
		const { user, conn } = this.props;

		return (
			<form onSubmit={this.handleSubmit} style={{textAlign: 'center', height: '400px'}}>
				<br/>
				<Avatar
					size={100}
					>
					P2P
					chat
				</Avatar>
				<br/>
				<br/>
				<TextField
					hintText="Your name"
					errorText={user.name.length===0?'This field is required':''}
					value={user.name} 
					onChange={this.handleNameChange}
				/>
				<br/>
				<br/>
				<RaisedButton 
					label="Connect" 
					type="submit"
					disabled={user.name.length===0}
					style={{}}
					/>
			</form>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user,
		log: state.log,
		conn: state.conn,
		history: state.history
	}
}

function mapDispatchProps(dispatch) {
	return {
		userActions: bindActionCreators(userActions, dispatch),
		logActions: bindActionCreators(logActions, dispatch),
		connActions: bindActionCreators(connActions, dispatch),
		historyActions: bindActionCreators(historyActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchProps)(LogInPage)