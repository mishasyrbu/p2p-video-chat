import React, { Component, PropTypes } from 'react';
import { Button, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

export default class TextChat extends Component {

	constructor() {
		super();

		this.state = {msgText: ''};
	}

	handleMsgChange = (event) => {
		this.setState({msgText: event.target.value});
	}

	handleSubmit = (event) => {
		event.preventDefault();

		this.props.sendData(this.state.msgText);

		this.props.addConversationToHistory({
			with: this.props.conn.recipientName,
			type: 'msg',
			from: this.props.user.name,
			text: this.state.msgText,
			datetime: new Date()
		});
		this.setState({ msgText: '' });
	}

	render() {
		return (
			<Form onSubmit={this.handleSubmit}>
				<FormGroup>
					<FormControl type="text" placeholder="Msg" value={this.state.msgText} onChange={this.handleMsgChange} />
				</FormGroup>
				<Button type="submit">
					Send msg
				</Button>
			</Form>
		);
	}
}

TextChat.propTypes = {
	sendData: PropTypes.func,
	addConversationToHistory: PropTypes.func
}