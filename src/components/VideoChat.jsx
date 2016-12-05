import React, { Component, PropTypes } from 'react';
import { ResponsiveEmbed, Grid, Row, Col } from 'react-bootstrap';

export default class VideoChat extends Component {

	constructor() {
		super();
	}

	render() {
		return (
			<Grid>
				<Row className="show-grid">
					<Col xs={6} md={2}>
						<ResponsiveEmbed a16by9>
							<video src={this.props.conn.myVideoSrc} autoPlay></video>
						</ResponsiveEmbed>
					</Col>
					<Col xs={6} md={2}>
						<ResponsiveEmbed a16by9>
							<video src={this.props.conn.recipientVideoSrc} autoPlay></video>
						</ResponsiveEmbed>
					</Col>
				</Row>
			</Grid>
		);
	}
}

VideoChat.propTypes = {
	conn: PropTypes.object
}