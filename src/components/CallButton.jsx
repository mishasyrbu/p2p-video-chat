import React, { Component, PropTypes } from 'react'

import { Button } from 'react-bootstrap';

export default class CallButton extends Component {

	constructor(props) {
		super(props);
	}

	handleButtonClick = () => {
		this.startMediaStream();
		this.props.sendData('lets-start');
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

	render() {
		const { conn } = this.props;

		return (
			<Button 
				type="button" 
				onClick={this.handleButtonClick} 
				disabled={!conn.recipientName}
				>
				Call
			</Button>
		);
	}
}

CallButton.propTypes = {
	conn: PropTypes.object.isRequired,
	setLocalStream: PropTypes.func,
	setMyVideoSrc: PropTypes.func,
	sendData: PropTypes.func
}