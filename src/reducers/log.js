import { ADD_LOG } from '../constants/Log'

export default function log(state = [], action) {

	switch (action.type) {
		case ADD_LOG:
			return [ ...state, action.payload ];

		default:
			return state;
	}
	
}