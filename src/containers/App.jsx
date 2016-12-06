import React, { Component } from 'react';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import * as logActions from '../actions/LogActions';

import LogList from '../components/LogList'

class App extends Component {
	
	render() {

		return (
			<MuiThemeProvider>
				<div>
					{this.props.children}
					{/*<hr/>
					<LogList log={this.props.log} />*/}
				</div>
			</MuiThemeProvider>
		)
	}
}

function mapStateToProps(state) {
	return {
		log: state.log
	}
}

function mapDispatchProps(dispatch) {
	return {
		logActions: bindActionCreators(logActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchProps)(App)