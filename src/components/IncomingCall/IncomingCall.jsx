import React, { Component, PropTypes } from 'react';
import { Button, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';
import { btnCircle } from './styles';

export default class IncomingCall extends Component {

	constructor() {
		super();
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
				this.props.setLocalStream(stream);
				this.props.setMyVideoSrc(window.URL.createObjectURL(stream));
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
		this.props.answerForIncomingCall(true);
	}

	rejectCall = () => {
		this.props.answerForIncomingCall(true);
	}

	render() {
		const { conn } = this.props;

		return (
			<Modal isOpen={conn.call.incoming.initialized && !conn.call.incoming.answered} >
				<ModalHeader>
					<ModalTitle>Incoming call from {conn.call.incoming.from}</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<div style={{textAlign:'center'}}>
						<button type="button" className="btn btn-success" style={btnCircle} onClick={this.answerCall}>
							<span className="glyphicon glyphicon-earphone" aria-hidden="true">A</span>
						</button>
						&nbsp;
						&nbsp;
						<button type="button" className="btn btn-danger" style={btnCircle} onClick={this.rejectCall}>
							<span className="glyphicon glyphicon-earphone" aria-hidden="true">D</span>
						</button>
					</div>
				</ModalBody>
				<ModalFooter>
				</ModalFooter>
			</Modal>
		);
	}
}


IncomingCall.propTypes = {
	conn: PropTypes.object.isRequired,
	answerForIncomingCall: PropTypes.func,
	startMediaStream: PropTypes.func,
	sendData: PropTypes.func
}