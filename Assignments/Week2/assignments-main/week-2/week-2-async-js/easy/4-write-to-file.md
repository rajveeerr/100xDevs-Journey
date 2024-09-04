## Write to a file
Using the fs library again, try to write to the contents of a file.
You can use the fs library to as a black box, the goal is to understand async tasks.

const fileObj=require("fs");

fileObj.writeFile("sampleFile.txt","Data to be written to the file.",(err)=>{
    if(!err){
        console.log(`File Has been written succesfully!!!`)
    }
    else{
        console.log(`There was an error writing to the file. ERROR STATUS: ${err}`);
        
    }
})
