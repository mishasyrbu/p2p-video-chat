import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import * as userActions from '../actions/UserActions'
import * as logActions from '../actions/LogActions'
import * as connActions from '../actions/ConnActions'
import * as historyActions from '../actions/historyActions'

import TextChatComponent from '../components/TextChat/TextChatComponent'
import { sendData } from '../util'

class TextChatPage extends Component {

	constructor(props) {
		super(props);

		this.sendData = sendData.bind(this);
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