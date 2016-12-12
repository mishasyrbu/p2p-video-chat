export function stopStream(stream) {
	for (let track of stream.getTracks()) {
		track.stop();
	}
}