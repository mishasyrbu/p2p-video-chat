import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import * as userActions from '../actions/UserActions'
import * as logActions from '../actions/LogActions'
import * as connActions from '../actions/ConnActions'
import * as historyActions from '../actions/historyActions'

import { stopStream, sendData } from '../util'

class MainPage extends Component {

	constructor(props) {
		super(props);

		this.logMsg = this.props.logActions.addLog;
		this.sendData = sendData.bind(this);

		this.props.conn.peerConn.on('open', this.peerOnOpen);
		this.props.conn.peerConn.on('close', this.peerOnClose);
		this.props.conn.peerConn.on('call', this.peerOnCall);
		this.props.conn.peerConn.on('connection', this.peerOnConnection);
	}

	peerOnOpen = (id) => {
		this.logMsg('My peer ID is: ' + id);
	}

	peerOnClose = (id) => {
		this.logMsg('no connection to server');
		this.props.connActions.setPeerConn(null);
	}

	peerOnCall = (call) => {

		if (!this.props.conn.peerConn) {
			this.logMsg('cannot answer a call without a connection');
			return;
		}

		if (!this.props.conn.localStream) {
			this.logMsg('could not answer call as there is no localStream ready');
			return;
		}

		this.logMsg('incoming call answered');
		call.answer(this.props.conn.localStream);

		call.on('stream', (stream) => {
			this.props.connActions.setRecipientVideoSrc(window.URL.createObjectURL(stream));
			this.logMsg('start recipient video stream - 1');
		});
	}

	peerOnConnection = (conn) => {
		conn.on('data', (data) => {
			this.props.connActions.setRecipientName(conn.peer);
			if ( data.type === 'call' ) {
				switch (data.text) {
					case 'initialize-call': {
						this.props.connActions.initializeIncomingCall(conn.peer);
						browserHistory.push('/main/incoming_call');
						break;
					}
					case 'answer': {
						this.startCall();
						break;
					}
					case 'reject': {
						stopStream(this.props.conn.localStream);
						browserHistory.goBack();
						break;
					}
					case 'end-call': {
						stopStream(this.props.conn.localStream);
						browserHistory.goBack();
						break;
					}
				}
			}

			this.props.historyActions.addConversationToHistory({
				with: conn.peer,
				type: data.type,
				from: conn.peer,
				text: data.text,
				datetime: new Date()
			});
		});
	}

	startCall = () => {
		if (!this.props.conn.peerConn) {
			this.logMsg('please connect first');
			console.log(this.props.conn);
			return;
		}

		if (!this.props.conn.localStream) {
			this.logMsg('could not start call as there is no local camera');
			return
		}

		if (!this.props.conn.recipientName) {
			this.logMsg('could not start call as no recipient ID is set');
			return;
		}

		this.props.conn.peerConn.call(this.props.conn.recipientName, this.props.conn.localStream).on('stream', (stream) => {
			this.props.connActions.setRecipientVideoSrc(window.URL.createObjectURL(stream));
			this.logMsg('start recipient video stream - 2');
		});

		this.logMsg('outgoing call initiated to ' + this.props.conn.recipientName);
	}

	render() {

		return (
			<div>
				{this.props.children}
			</div>
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

export default connect(mapStateToProps, mapDispatchProps)(MainPage)