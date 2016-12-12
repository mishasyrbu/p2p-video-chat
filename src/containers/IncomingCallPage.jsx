import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import * as userActions from '../actions/UserActions'
import * as logActions from '../actions/LogActions'
import * as connActions from '../actions/ConnActions'
import * as historyActions from '../actions/historyActions'

import IncomingCallComponent from '../components/IncomingCall/IncomingCallComponent'

import { sendData, startMediaStream } from '../util'

class IncomingCallPage extends Component {

	constructor(props) {
		super(props);

		this.logMsg = this.props.logActions.addLog;
		this.sendData = sendData.bind(this);
		this.startMediaStream = startMediaStream.bind(this);
	}

	answerCall = () => {
		this.startMediaStream();
		this.sendData(
			{
				type: 'call',
				text: 'answer'
			}
		);
		this.props.connActions.answerForIncomingCall(true);
		console.log(browserHistory)
		browserHistory.push('/main/call');
	}

	rejectCall = () => {
		this.sendData(
			{
				type: 'call',
				text: 'reject'
			}
		);
		this.props.connActions.answerForIncomingCall(false);
		browserHistory.goBack();
	}

	render() {

		return (
			<IncomingCallComponent 
				conn={this.props.conn}
				answerCall={this.answerCall}
				rejectCall={this.rejectCall}
				/>
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

export default connect(mapStateToProps, mapDispatchProps)(IncomingCallPage)