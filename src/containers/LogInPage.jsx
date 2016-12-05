import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Button, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import Peer from 'peerjs';

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
			<Form onSubmit={this.handleSubmit}>
				<FormGroup>
					<ControlLabel>Connect as:</ControlLabel>
					<FormControl type="text" placeholder="Your name" value={user.name} onChange={this.handleNameChange} />
				</FormGroup>
				<Button type="submit" disabled={conn.peerConn!=null}>
					Connect
				</Button>
				&nbsp;
				<Button type="button" disabled={conn.peerConn==null} onClick={this.props.closePeerConn}>
					Disconnect
				</Button>
			</Form>
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