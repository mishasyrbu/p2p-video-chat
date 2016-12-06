import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { AppBar, TextField, RaisedButton, Drawer, MenuItem, IconButton } from 'material-ui'
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'

import * as userActions from '../actions/UserActions';
import * as logActions from '../actions/LogActions';
import * as connActions from '../actions/ConnActions';
import * as historyActions from '../actions/historyActions';

import MsgList from '../components/MsgList'
import TextChat from '../components/TextChat'
import CallButton from '../components/CallButton'
// import VideoChat from '../components/VideoChat'

class TextChatPage extends Component {

	constructor(props) {
		super(props);

		this.logMsg = this.props.logActions.addLog;

		this.state = {open: false};
	}

	sendData = (data) => {
		let dconn = this.props.conn.peerConn.connect(this.props.conn.recipientName);
		dconn.on('open', () => {
			dconn.send(data);
			console.log('sendData', this.props.conn.peerConn);
		});
	}

	handleToggle = () => this.setState({open: !this.state.open});
	handleClose = () => this.setState({open: false});

	render() {
		const { user, conn, history } = this.props;
		const iconNavButton = (<IconButton onClick={browserHistory.goBack}><NavigationArrowBack /></IconButton>);
		const callButton = (
			<CallButton 
				conn={conn}
				setLocalStream={this.props.connActions.setLocalStream}
				setMyVideoSrc={this.props.connActions.setMyVideoSrc}
				sendData={this.sendData}
				/>
			);

		return (
			<div style={{position: 'fixed', width: '100%', height: '100%'}}>
				<AppBar
					title={conn.recipientName}
					iconElementLeft={iconNavButton}
					iconElementRight={callButton}
					/>
				<Drawer
					docked={false}
					disableSwipeToOpen={false}
					width={200}
					open={this.state.open}
					onRequestChange={(open) => this.setState({open})}
					>
					<MenuItem>{this.props.user.name}</MenuItem>
					<MenuItem onClick={()=>{browserHistory.push('/main/users_list'); this.handleClose();}}>Users List</MenuItem>
				</Drawer>

				<MsgList history={history} />
				<TextChat 
					user={user} 
					conn={conn}
					sendData={this.sendData}
					addConversationToHistory={this.props.historyActions.addConversationToHistory}
					/>
				{/*<VideoChat conn={conn} />*/}
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