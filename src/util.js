export function stopStream(stream) {
	for (let track of stream.getTracks()) {
		track.stop();
	}
}

export function sendData(data) {
	let dconn = this.props.conn.peerConn.connect(this.props.conn.recipientName);
	dconn.on('open', () => {
		dconn.send(data);
		this.props.historyActions.addConversationToHistory({
			with: this.props.conn.recipientName,
			type: data.type,
			from: this.props.user.name,
			text: data.text,
			datetime: new Date()
		});
	});
}

export function startMediaStream(audioEnable=false, videoEnable=true) {
	navigator.webkitGetUserMedia(
		{
			audio: audioEnable,
			video: videoEnable
		},

		(stream) => {
			this.props.setLocalStream(stream);
			this.props.setMyVideoSrc(window.URL.createObjectURL(stream));
		},

		(err) => {
			this.logMsg('failed to access local camera');
			this.logMsg(err.message);
		}
	);
}