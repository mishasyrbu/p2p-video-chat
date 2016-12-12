import React, { Component, PropTypes } from 'react'

import { IconButton } from 'material-ui'
import CommunicationPhone from 'material-ui/svg-icons/communication/phone'
import { browserHistory } from 'react-router'

import { startMediaStream } from '../util'

export default class CallButton extends Component {

	constructor(props) {
		super(props);

		this.startMediaStream = startMediaStream.bind(this);
	}

	handleButtonClick = () => {
		this.startMediaStream();
		this.props.sendData(
			{
				type: 'call',
				text: 'initialize-call'
			}
		);
		browserHistory.push('/main/call');
	}

	render() {
		const { conn } = this.props;

		return (
			<IconButton 
				onClick={this.handleButtonClick} 
				disabled={!conn.recipientName}
				>
				<CommunicationPhone />
			</IconButton>
		);
	}
}

CallButton.propTypes = {
	conn: PropTypes.object.isRequired,
	setLocalStream: PropTypes.func,
	setMyVideoSrc: PropTypes.func,
	sendData: PropTypes.func
}