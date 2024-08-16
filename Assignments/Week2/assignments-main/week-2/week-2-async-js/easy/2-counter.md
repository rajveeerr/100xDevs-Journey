## Counter without setInterval

Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.

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


































































(Hint: setTimeout)