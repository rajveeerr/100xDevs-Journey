export const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return {
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, "0"),//adds zero to the minutes until its min-length becomes 2
        seconds: seconds.toString().padStart(2, "0"),
    }
}

export const calculateTime = (hours, minutes, seconds) => {
    if(minutes>59||seconds>59) return 0;
    const calculatedTime = parseInt(hours)*3600 + parseInt(minutes)*60 + parseInt(seconds);

    return isNaN(calculatedTime) ? 0 : calculatedTime; // Return 0 if any value is NaN
}