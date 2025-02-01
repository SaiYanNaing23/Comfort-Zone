export const formatDuration = ( timeStamp : number) => {
    const minutes = Math.floor(timeStamp / 60);
    const seconds = Math.floor(timeStamp % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}