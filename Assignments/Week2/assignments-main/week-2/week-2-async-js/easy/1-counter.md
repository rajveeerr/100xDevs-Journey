## Create a counter in JavaScript

We have already covered this in the second lesson, but as an easy recap try to code a counter in Javascript
It should go up as time goes by in intervals of 1 second

let startAt=1;
function timer(endAt){
    intervalId=setInterval(()=>{if(startAt<=endAt){console.log(startAt);startAt++}else{clearInterval(intervalId)}},1000);
}

timer(10);