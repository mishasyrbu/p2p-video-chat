import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import user from './user';
import log from './log';
import conn from './conn';
import history from './history'

export default combineReducers({
	routing: routerReducer,
	user,
	log,
	conn,
	history
});