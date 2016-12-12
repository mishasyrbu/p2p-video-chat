import React, { Component, PropTypes } from 'react';
import { TextField, IconButton, Paper } from 'material-ui'
import ContentSend from 'material-ui/svg-icons/content/send'

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

		this.props.sendData(
			{
				type: 'message',
				text: this.state.msgText
			}
		);

		this.setState({ msgText: '' });
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<Paper zDepth={1} style={{textAlign: 'center', position: 'fixed', width: '100%', bottom: 0}}>
					<TextField
						hintText="Type a message..."
						multiLine={true}
						rows={1}
						rowsMax={2}
						value={this.state.msgText} 
						onChange={this.handleMsgChange}
						/>
					<IconButton
						type="submit"
						disabled={this.state.msgText.length===0}
						>
						<ContentSend />
					</IconButton>
				</Paper>
			</form>
		);
	}
}

TextChat.propTypes = {
	sendData: PropTypes.func,
	addConversationToHistory: PropTypes.func
}