import { ADD_CONVERSATION_TO_HISTORY } from '../constants/History'

export function addConversationToHistory(conversation) {

	return {
		type: ADD_CONVERSATION_TO_HISTORY,
		payload: conversation
	}
}