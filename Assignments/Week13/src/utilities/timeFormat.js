export default function formatTime(time){
    let hour=Math.floor(time/3600).toString().padStart(2,"0")
    let minutes=Math.floor((time%3600)/60).toString().padStart(2,"0")
    let seconds=Math.floor(time%60).toString().padStart(2,"0")

    return {hour,minutes,seconds}
}