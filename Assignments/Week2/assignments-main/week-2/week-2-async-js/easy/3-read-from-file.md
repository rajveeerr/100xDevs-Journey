## Reading the contents of a file

Write code to read contents of a file and print it to the console. 
You can use the fs library to as a black box, the goal is to understand async tasks. 
Try to do an expensive operation below the file read and see how it affects the output. 
Make the expensive operation more and more expensive and see how it affects the output. 



const fileObj=require("fs");
// I/O Bound Task
fileObj.readFile("sampleFile.txt","utf-8",(err,data)=>{
    if(!err){
        console.log(`File Has been read succesfully!!!. The content present in the file: ${data}`)
    }
    else{
        console.log(`There was an error opening the file. ERROR STATUS: ${err}`);
        
    }
})

// An CPU Bound expensive operation

fact=1;
num=50;
i=num;
while(i){
    fact*=i;
    i--;
}
console.log(`Expensive Operation DONE!!! Factorial of ${num} = ${fact}`);

sub=0;
for(let j=0;j<100000000;j++){
    sub-=j;
}
console.log(`VERY Expensive Operation DONE!!! Factorial of ${num} = ${fact}`);

//Observation: The read file fn is not called until the cpu bound extensive tasks are done!!!. The compleated readfile callback waits in the callback until the call stack gets emply.