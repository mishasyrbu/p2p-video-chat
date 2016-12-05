import { SET_USER_NAME } from '../constants/User'

export function setUserName(name) {

	return {
		type: SET_USER_NAME,
		payload: name
	}
}