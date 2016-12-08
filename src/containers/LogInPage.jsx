import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Peer from 'peerjs'

import * as userActions from '../actions/UserActions'
import * as logActions from '../actions/LogActions'
import * as connActions from '../actions/ConnActions'

import LogInComponent from '../components/LogIn/LogInComponent'

class LogInPage extends Component {

	constructor(props) {
		super(props);

		this.logMsg = this.props.logActions.addLog;
		this.logMsg('App started!');
	}

	connectToServer = () => {
		const conn = new Peer(this.props.user.name, {key: 'byr21psbtd3d6lxr'});
		this.props.connActions.setPeerConn(conn);

		//if ( this.props.conn.peerConn !== null )
			browserHistory.push('/main/users_list');
	}

	render() {

		return (
			<LogInComponent 
				user={this.props.user}
				setUserName={this.props.userActions.setUserName}
				connectToServer={this.connectToServer}
				/>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user,
		log: state.log,
		conn: state.conn
	}
}

function mapDispatchProps(dispatch) {
	return {
		userActions: bindActionCreators(userActions, dispatch),
		logActions: bindActionCreators(logActions, dispatch),
		connActions: bindActionCreators(connActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchProps)(LogInPage)