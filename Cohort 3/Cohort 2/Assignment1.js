// First Assignment: Create a counter in Javascript (counts down from 30 to 0)

function timer(time){
    if(time<0){
        console.log("Time's Up!!!");
        return 1;
    }
    else{
        console.log(time);
        time--;
        setTimeout(function(){timer(time);},1000);
    }
    
}
timer(3);


//Second Assingnment: Calculate the time it takes between a setTimeout call and the inner function actually

function smth(){
    let exitime=performance.now();
    let ans=(exitime-starttime)/1000
    console.log("The settime function executed the function in "+ans+" sec.");
}
let starttime=performance.now();
setTimeout(smth,3000);


// Third Assignment: Create a terminal clock(HH:MM:SS)

//gpt's code
// const readline = require('readline');
// function clearConsole() {
//     readline.cursorTo(process.stdout, 0, 0);
//     readline.clearScreenDown(process.stdout);
// }


function clock(){
    cl=new Date();
    // clearConsole()
    console.log(cl.getHours()+":"+cl.getMinutes()+":"+cl.getSeconds());
    // setTimeout(clock,1000);
}
setInterval(clock,1000);
// clock();