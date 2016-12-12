import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'

import { AppBar, TextField, RaisedButton, Drawer, MenuItem, IconButton } from 'material-ui'
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'

import MsgList from '../MsgList'
import TextChat from '../TextChat'
import CallButton from '../CallButton'
import { styles as s } from './styles'

export default class TextChatComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {open: false};
	}

	handleClose = () => this.setState({open: false});

	render() {
		const { user, conn, history } = this.props;
		const iconNavButton = (<IconButton onClick={browserHistory.goBack}><NavigationArrowBack /></IconButton>);
		const callButton = (
			<CallButton 
				conn={conn}
				setLocalStream={this.props.setLocalStream}
				setMyVideoSrc={this.props.setMyVideoSrc}
				sendData={this.props.sendData}
				/>
			);

		return (
			<div>
				<AppBar
					title={conn.recipientName}
					iconElementLeft={iconNavButton}
					iconElementRight={callButton}
					/>
				<Drawer
					docked={false}
					disableSwipeToOpen={false}
					width={200}
					open={this.state.open}
					onRequestChange={(open) => this.setState({open})}
					>
					<MenuItem>{user.name}</MenuItem>
					<MenuItem onClick={()=>{browserHistory.push('/main/users_list'); this.handleClose();}}>Users List</MenuItem>
				</Drawer>

				<MsgList history={history} />
				<TextChat 
					user={user} 
					conn={conn}
					sendData={this.props.sendData}
					addConversationToHistory={this.props.addConversationToHistory}
					/>
			</div>
		);
	}
}

TextChatComponent.propTypes = {
	conn: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	sendData: PropTypes.func.isRequired,
	addConversationToHistory: PropTypes.func.isRequired
}