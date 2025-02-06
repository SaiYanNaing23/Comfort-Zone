export const formatDuration = ( timeStamp : number) => {
    const minutes = Math.floor(timeStamp / 60);
    const seconds = Math.floor(timeStamp % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

export const formatTime = (date: string) => {
	return new Date(date).toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	});
};