import { ADD_CONVERSATION_TO_HISTORY } from '../constants/History'

const conversation = {
	with: 'user/group',
	type: 'call/msg',
	from: 'user',
	text: '',
	datetime: new Date()
}

const initialState = {
	conversation: []
}

export default function history(state = initialState, action) {

	switch (action.type) {
		case ADD_CONVERSATION_TO_HISTORY:
		{
			let newState = Object.assign({} , state);
			newState.conversation.push(action.payload);
			return newState;
		}

		default:
			return state;
	}
	
}