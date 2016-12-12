import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import * as userActions from '../actions/UserActions'
import * as logActions from '../actions/LogActions'
import * as connActions from '../actions/ConnActions'
import * as historyActions from '../actions/historyActions'

import TextChatComponent from '../components/TextChat/TextChatComponent'

class TextChatPage extends Component {

	constructor(props) {
		super(props);
	}

	sendData = (data) => {
		let dconn = this.props.conn.peerConn.connect(this.props.conn.recipientName);
		dconn.on('open', () => {
			dconn.send(data);
			this.props.historyActions.addConversationToHistory({
				with: this.props.conn.recipientName,
				type: data.type,
				from: this.props.user.name,
				text: data.text,
				datetime: new Date()
			});
		});
	}

	render() {
		
		return (
			<TextChatComponent 
				conn={this.props.conn}
				user={this.props.user}
				history={this.props.history}
				sendData={this.sendData}
				setLocalStream={this.props.connActions.setLocalStream}
				setMyVideoSrc={this.props.connActions.setMyVideoSrc}
				addConversationToHistory={this.props.historyActions.addConversationToHistory}
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

export default connect(mapStateToProps, mapDispatchProps)(TextChatPage)