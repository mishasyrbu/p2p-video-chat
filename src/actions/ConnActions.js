import { SET_PEER_CONN, 
		CLOSE_PEER_CONN, 
		INITIALIZE_INCOMING_CALL, 
		ANSWER_FOR_INCOMING_CALL, 
		SET_LOCAL_STREAM, 
		SET_MY_VIDEO_SRC, 
		SET_RECIPIENT_VIDEO_SRC, 
		SET_RECIPIENT_NAME } from '../constants/Conn'

export function setPeerConn(conn) {

	return {
		type: SET_PEER_CONN,
		payload: conn
	}
}

export function closePeerConn() {

	return {
		type: CLOSE_PEER_CONN,
		payload: null
	}
}

export function initializeIncomingCall(from) {

	return {
		type: INITIALIZE_INCOMING_CALL,
		payload: from
	}
}

export function answerForIncomingCall(answer) {

	return {
		type: ANSWER_FOR_INCOMING_CALL,
		payload: answer
	}
}

export function setRecipientName(name) {

	return {
		type: SET_RECIPIENT_NAME,
		payload: name
	}
}

export function setLocalStream(stream) {
	return {
		type: SET_LOCAL_STREAM,
		payload: stream
	}
}

export function setMyVideoSrc(stream) {
	return {
		type: SET_MY_VIDEO_SRC,
		payload: stream
	}
}

export function setRecipientVideoSrc(stream) {
	return {
		type: SET_RECIPIENT_VIDEO_SRC,
		payload: stream
	}
}