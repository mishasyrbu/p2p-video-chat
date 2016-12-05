import React, { Component, PropTypes } from 'react';

export default class MsgList extends Component {

	constructor() {
		super();
	}


	render() {
		return (
			<div style={{overflow: 'auto', height: '200px'}}>
				<ul>
					{
						this.props.history.conversation.map(function(value, key) {
							return <li key={key}><b>{value.from}:</b> <br/> {value.text} <br/> <small>{value.datetime.toString()}</small></li>;
						})
					}
				</ul>
			</div>
		);
	}
}

MsgList.propTypes = {
	history: PropTypes.object
}