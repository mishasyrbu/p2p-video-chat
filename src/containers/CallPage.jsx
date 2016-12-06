import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { IconButton } from 'material-ui'
import CallEnd from 'material-ui/svg-icons/communication/call-end'

import * as userActions from '../actions/UserActions';
import * as logActions from '../actions/LogActions';
import * as connActions from '../actions/ConnActions';
import * as historyActions from '../actions/historyActions';

class CallPage extends Component {

	constructor(props) {
		super(props);

		this.logMsg = this.props.logActions.addLog;
	}

	stopStream = (stream) => {
		for (let track of stream.getTracks()) { 
			track.stop()
		}
	}

	endCall = () => {
		this.logMsg('End call');
		browserHistory.goBack();
		this.stopStream(this.props.conn.localStream);
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
				<video
					src={conn.recipientVideoSrc}
					autoPlay
					style={{
						position: 'absolute',
						width: 'auto',
						height: '15%',
						bottom: '20%'
					}}
					>
				</video>
				<IconButton
					onClick={this.endCall}
					iconStyle={{
						position: 'absolute', 
						width: '100%', 
						height: '100%',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%,-50%)',
						color: 'white'
					}}
					style={{
						textAlign: 'center', 
						position: 'fixed', 
						width: '100%',
						height: '10%',
						bottom: 0,
						opacity: 0.6,
					    backgroundColor: 'red'
					}}
					>
					<CallEnd />
				</IconButton>
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

export default connect(mapStateToProps, mapDispatchProps)(CallPage)