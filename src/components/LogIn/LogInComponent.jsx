import React, { Component, PropTypes } from 'react'
import { TextField, RaisedButton, Avatar } from 'material-ui'

import s from './styles.scss'

export default class LogInComponent extends Component {
	constructor(props) {
		super(props);
	}

	handleNameChange = (event) => {
		this.props.setUserName(event.target.value.trim());
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.connectToServer();
	}

	render() {
		const { user } = this.props;
		return (
			<form onSubmit={this.handleSubmit} className={s.loginForm}>
				<Avatar	className={s.loginAvatar} size={100}>
					P2P	chat
				</Avatar>
				<br/>
				<br/>
				<TextField
					hintText="Your name"
					errorText={user.name.length===0?'This field is required':''}
					value={user.name} 
					onChange={this.handleNameChange}
					className={s.loginUserName}
				/>
				<br/>
				<br/>
				<RaisedButton 
					label="Connect" 
					type="submit"
					disabled={user.name.length===0}
					className={s.loginConnectButton}
					/>
			</form>
		);
	}
}

LogInComponent.propTypes = {
	user: PropTypes.object.isRequired,
	setUserName: PropTypes.func.isRequired,
	connectToServer: PropTypes.func.isRequired
}