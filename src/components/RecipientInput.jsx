import React, { Component, PropTypes } from 'react'

import { Button, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

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
			<div>
				<ControlLabel>Connect with:</ControlLabel>
				<FormControl type="text" placeholder="Recipient name" value={conn.recipientName} onChange={this.handleInputChange} />
			</div>
		);
	}
}

RecipientInput.propTypes = {
	conn: PropTypes.object,
	setRecipientName: PropTypes.func
}