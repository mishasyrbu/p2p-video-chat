import React, { Component, PropTypes} from 'react'

import { IconButton } from 'material-ui'
import CallEnd from 'material-ui/svg-icons/communication/call-end'
import Call from 'material-ui/svg-icons/communication/call'

import { styles as s } from './styles'

export default class IncomingCallComponent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { conn } = this.props;

		return (
			<div>
				<div style={s.recipientInfo}>
					<p>{conn.recipientName}</p>
				</div>
				<video 
					src={conn.recipientVideoSrc} 
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
				<div style={s.actionButtonPanel}>
					<IconButton
						onClick={this.props.answerCall}
						iconStyle={{color: 'white'}}
						style={s.answerButton}
						>
						<Call />
					</IconButton>
					<IconButton
						onClick={this.props.rejectCall}
						style={s.rejectButton}
						iconStyle={{color: 'white'}}
						>
						<CallEnd />
					</IconButton>
				</div>
			</div>
		);
	}
}


IncomingCallComponent.propTypes = {
	conn: PropTypes.object.isRequired,
	answerCall: PropTypes.func.isRequired,
	rejectCall: PropTypes.func.isRequired
}