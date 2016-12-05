import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import * as userActions from '../actions/UserActions';
import * as logActions from '../actions/LogActions';
import * as connActions from '../actions/ConnActions';
import * as historyActions from '../actions/historyActions';

import RecipientInput from '../components/RecipientInput'

class UsersListPage extends Component {

	constructor(props) {
		super(props);

		this.logMsg = this.props.logActions.addLog;
	}

	render() {

		return (
			<div>
				<RecipientInput 
					conn={this.props.conn} 
					setRecipientName={this.props.connActions.setRecipientName} 
					/>
					<button type="button" onClick={()=>browserHistory.push('/main/text_chat')}>Text Chat</button>
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

export default connect(mapStateToProps, mapDispatchProps)(UsersListPage)