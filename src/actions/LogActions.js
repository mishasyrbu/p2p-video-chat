import { ADD_LOG } from '../constants/Log'

export function addLog(text, type='info') {

	return {
		type: ADD_LOG,
		payload: {
			type,
			text
		}
	}
}