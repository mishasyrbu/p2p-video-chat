import React, { Component, PropTypes } from 'react'

import { TextField } from 'material-ui'

export default class RecipientInput extends Component {

	constructor(props) {
		super(props);
	}

	handleInputChange = (event) => {
		this.props.setRecipientName(event.target.value.trim());
	}

	render() {
		const { conn } = this.props;

		return (
			<TextField
				hintText="Recipient name"
				value={conn.recipientName} 
				onChange={this.handleInputChange}
			/>
		);
	}
}

RecipientInput.propTypes = {
	conn: PropTypes.object,
	setRecipientName: PropTypes.func
}