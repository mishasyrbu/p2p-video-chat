import React, { Component, PropTypes } from 'react';

export default class LogList extends Component {

	constructor() {
		super();
	}


	render() {
		return (
			<div style={{overflow: 'auto', height: '150px'}}>
				<ul>
					{
						this.props.log.map(function(value, key) {
							return <li key={key}>{value.text}</li>;
						})
					}
				</ul>
			</div>
	);
	}
}

LogList.propTypes = {
	log: PropTypes.array
}