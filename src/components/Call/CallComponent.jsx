import React, { Component, PropTypes } from 'react'

import { IconButton } from 'material-ui'
import CallEnd from 'material-ui/svg-icons/communication/call-end'

import s from './styles.scss'

export default class CallComponent extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { conn } = this.props;

		return (
			<div className={s.callView}>
				<div className={s.callInfo}>
					<p>{conn.recipientName}</p>
				</div>
				<video 
					src={conn.recipientVideoSrc} 
					autoPlay
					className={s.recipientVideo}
					>
				</video>
				<video
					src={conn.myVideoSrc}
					autoPlay
					className={s.myVideoSrc}
					>
				</video>
				<IconButton
					onClick={this.props.endCall}
					className={s.callEndButton}
					iconStyle={{
						position: 'absolute', 
						width: '100%', 
						height: '100%',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%,-50%)',
						color: 'white'
					}}
					>
					<CallEnd />
				</IconButton>
			</div>
		);
	}
}

CallComponent.propTypes = {
	conn: PropTypes.object.isRequired,
	endCall: PropTypes.func.isRequired
}