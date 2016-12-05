import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import * as userActions from '../actions/UserActions';
import * as logActions from '../actions/LogActions';
import * as connActions from '../actions/ConnActions';
import * as historyActions from '../actions/historyActions';

import MsgList from '../components/MsgList'
import TextChat from '../components/TextChat'
import CallButton from '../components/CallButton'
import VideoChat from '../components/VideoChat'

class TextChatPage extends Component {

	constructor(props) {
		super(props);

		this.logMsg = this.props.logActions.addLog;
	}

	sendData = (data) => {
		let dconn = this.props.conn.peerConn.connect(this.props.conn.recipientName);
		dconn.on('open', () => {
			dconn.send(data);
			console.log('sendData', this.props.conn.peerConn);
		});
	}


	render() {
		const { user, conn, history } = this.props;

		return (
			<div>
				<MsgList history={history} />
				<TextChat 
					user={user} 
					conn={conn}
					sendData={this.sendData}
					addConversationToHistory={this.props.historyActions.addConversationToHistory}
					/>
				<CallButton 
					conn={conn}
					setLocalStream={this.props.connActions.setLocalStream}
					setMyVideoSrc={this.props.connActions.setMyVideoSrc}
					sendData={this.sendData}
					/>
				<VideoChat conn={conn} />
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

export default connect(mapStateToProps, mapDispatchProps)(TextChatPage)