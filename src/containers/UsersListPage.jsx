import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { AppBar, TextField, RaisedButton, Drawer, MenuItem, IconButton } from 'material-ui'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import * as userActions from '../actions/UserActions';
import * as logActions from '../actions/LogActions';
import * as connActions from '../actions/ConnActions';
import * as historyActions from '../actions/historyActions';

import RecipientInput from '../components/RecipientInput'

class UsersListPage extends Component {

	constructor(props) {
		super(props);

		this.logMsg = this.props.logActions.addLog;

		this.state = {open: false};
	}

	handleToggle = () => this.setState({open: !this.state.open});
	handleClose = () => this.setState({open: false});

	render() {
		const iconNavButton = (<IconButton onClick={this.handleToggle}><NavigationMenu /></IconButton>);

		return (
			<div>
				<AppBar
					title="P2P video chat"
					style={{width: '100%'}}
					iconElementLeft={iconNavButton}
					/>
				<Drawer
					docked={false}
					disableSwipeToOpen={false}
					width={200}
					open={this.state.open}
					onRequestChange={(open) => this.setState({open})}
					>
					<MenuItem>{this.props.user.name}</MenuItem>
					<MenuItem onClick={()=>{browserHistory.push('/main/users_list'); this.handleClose();}}>Users List</MenuItem>
				</Drawer>

				<RecipientInput 
					conn={this.props.conn} 
					setRecipientName={this.props.connActions.setRecipientName} 
					/>

				<RaisedButton 
					label="Text Chat" 
					onClick={()=>browserHistory.push('/main/text_chat')}
					/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user,
		log: state.log,
		conn: state.conn,
		history: state.history
	}
}

function mapDispatchProps(dispatch) {
	return {
		userActions: bindActionCreators(userActions, dispatch),
		logActions: bindActionCreators(logActions, dispatch),
		connActions: bindActionCreators(connActions, dispatch),
		historyActions: bindActionCreators(historyActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchProps)(UsersListPage)