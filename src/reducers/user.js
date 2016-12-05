import { SET_USER_NAME } from '../constants/User'

const initialState = {
	name: ''
}

export default function user(state = initialState, action) {

	switch (action.type) {
		case SET_USER_NAME:
			return Object.assign({}, state, { name: action.payload })
			//{ ...state, name: action.payload }

		default:
			return state;
	}
	
}