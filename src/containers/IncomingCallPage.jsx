import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { IconButton } from 'material-ui'
import CallEnd from 'material-ui/svg-icons/communication/call-end'
import Call from 'material-ui/svg-icons/communication/call'

import * as userActions from '../actions/UserActions';
import * as logActions from '../actions/LogActions';
import * as connActions from '../actions/ConnActions';
import * as historyActions from '../actions/historyActions';

class IncomingCallPage extends Component {

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

	startMediaStream = (audioEnable=false, videoEnable=true) => {
		navigator.webkitGetUserMedia(
			{
				audio: audioEnable,
				video: videoEnable
			},

			(stream) => {
				this.props.connActions.setLocalStream(stream);
				this.props.connActions.setMyVideoSrc(window.URL.createObjectURL(stream));
			},

			(err) => {
				this.logMsg('failed to access local camera');
				this.logMsg(err.message);
			}
		);
	}

	answerCall = () => {
		this.startMediaStream();
		this.sendData('ok');
		this.props.connActions.answerForIncomingCall(true);
		console.log(browserHistory)
		browserHistory.push('/main/call');
	}

	rejectCall = () => {
		this.props.connActions.answerForIncomingCall(true);
		browserHistory.goBack();
	}

	render() {
		const { user, conn, history } = this.props;

		return (
			<div style={{position: 'fixed', width: '100%', height: '100%'}}>
				<video 
					src={conn.myVideoSrc} 
					autoPlay
					style={{
						height: '100%',
						width: 'auto',
						top: '50%',
						position: 'absolute',
						left: '50%',
						transform: 'translate(-50%,-50%)'
					}}
					>
				</video>
				<div style={{
					position: 'absolute', 
					width: '100%', 
					height: '30%',
					position: 'absolute',
					bottom: 0
				}}>
					<IconButton
						onClick={this.answerCall}
						iconStyle={{
							color: 'white'
						}}
						style={{
							textAlign: 'center', 
							width: '40%',
							height: '30%',
							opacity: 0.6,
						    backgroundColor: 'green',
						    float: 'left',
						    marginLeft: '5%',
						    borderRadius: '25px'
						}}
						>
						<Call />
					</IconButton>
					<IconButton
						onClick={this.rejectCall}
						iconStyle={{
							color: 'white'
						}}
						style={{
							textAlign: 'center', 
							width: '40%',
							height: '30%',
							opacity: 0.6,
						    backgroundColor: 'red',
						    float: 'right',
						    marginRight: '5%',
						    borderRadius: '25px'
						}}
						>
						<CallEnd />
					</IconButton>
				</div>
				<div
					style={{
						textAlign: 'center', 
						position: 'fixed', 
						width: '100%',
						height: '15%',
						top: 0,
						opacity: 0.2,
					    backgroundColor: '#050505',
					    color: 'white',
					    fontSize: '200%',
					    fontFamily: 'sans-serif'
					}}
					>
					<p>{conn.recipientName}</p>
				</div>
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

export default connect(mapStateToProps, mapDispatchProps)(IncomingCallPage)