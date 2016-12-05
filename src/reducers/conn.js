import { SET_PEER_CONN, 
		CLOSE_PEER_CONN, 
		INITIALIZE_INCOMING_CALL, 
		ANSWER_FOR_INCOMING_CALL, 
		SET_RECIPIENT_NAME, 
		SET_LOCAL_STREAM, 
		SET_MY_VIDEO_SRC, 
		SET_RECIPIENT_VIDEO_SRC } from '../constants/Conn'

const initialState = {
	peerConn: null,
	recipientName: '',
	localStream: null,
	myVideoSrc: null,
	recipientVideoSrc: null,
	call: {
		incoming: {
			initialized: false,
			answered: false,
			from: ''
		},
		outgoing: {
			initialized: false,
			answered: false,
			to: ''
		}

	}
}

export default function conn(state = initialState, action) {

	switch (action.type) {
		case SET_PEER_CONN:
			return Object.assign({}, state, { peerConn: action.payload })
		case CLOSE_PEER_CONN:
			return Object.assign({}, state, { peerConn: action.payload })
		case INITIALIZE_INCOMING_CALL:
		{
			let newState = Object.assign({}, state);
			newState.call.incoming.initialized = true;
			newState.call.incoming.from = action.payload;
			return newState;
		}
		case ANSWER_FOR_INCOMING_CALL:
		{
			let newState = Object.assign({}, state);
			newState.call.incoming.answered = action.payload;
			return newState;
		}
		case SET_RECIPIENT_NAME:
		{
			let newState = Object.assign({}, state);
			newState.recipientName = action.payload;
			return newState;
		}
		case SET_LOCAL_STREAM:
			return Object.assign({}, state, { localStream: action.payload })
		case SET_MY_VIDEO_SRC:
			return Object.assign({}, state, { myVideoSrc: action.payload })
		case SET_RECIPIENT_VIDEO_SRC:
			return Object.assign({}, state, { recipientVideoSrc: action.payload })

		default:
			return state;
	}
	
}