function promisifiedSetTimeout(ms){
    // function checkingFunction(resolve){ //resolve is a callback function
    //     setTimeout(resolve,5000); //when the resolve will be called the promise will return something and callback will be called
    // }
    // return new Promise(checkingFunction); //checkingFunction is basically fn which takes another fn(resolve in this case) as argument(this is actually the callback fn passed when the .then(cb) method is used) and does all the async tasks and at the end it calls the resolve(callback)

    return new Promise(resolve => setTimeout(resolve,ms)); //more condensed version of what's done in the above comments
}

const fileObj=require("fs");

function promisifiedReadFile(fileName){
    return new Promise( (resolve) => fileObj.readFile(fileName,"utf-8",(err,data)=>{
        if(err){
            console.log("Error Occured while reading file. ERROR STATUS: "+err)
            resolve();
        };
        resolve(data);
    }))
}

function promisifiedWriteFile(fileName,data){
    return new Promise( resolve => {fileObj.writeFile(fileName,data,(err) => {
        if(err){
            console.log("There was a problem writing to the file. ERROR STaTUS: "+err);
            resolve();
        }
        console.log("File has been written succesfully");
        resolve();
    })});
}


function promisifiedCleanFile(fileName){

    function cleaner(resolve){
        fileObj.readFile(fileName,"utf-8",(err,data)=>{ //its just a function header with no name
            if(err){
                console.log("Error Occured while reading file. ERROR STATUS: "+err)
                resolve();
            }
            fileContent=data.trim();
            fileObj.writeFile(fileName,fileContent,(err)=>{
                if(err){
                    console.log("There was a problem writing to the file. ERROR STaTUS: "+err);
                    resolve();
                }
                console.log("File has been CLEANED SuccesfullY!!! enjoy...");
                resolve(fileContent);
            });
        });
    }
    return new Promise(cleaner);    
}

function stopped(atTime){
    console.log(`Timer Stopped at ${atTime}`);
}
function fileReadingStatus(data){
    console.log("This fn ran after file has been READ. Data of File: "+data)
}
function fileWritingStatus(){
    console.log("This fn ran after file has been WRITTEN")
}
function fileCleaningStatus(data){
    console.log("This fn ran after file has been CLEANED. Data of File: "+data)
}

promisifiedSetTimeout(5000).then(()=>stopped(5000)) //workaround to pass arguments to callback fn, then(stopped.bind(arg1,arg2)) can also be done easily

promisifiedWriteFile("sampleFile.txt","                   Write this content to the file      ").then(fileWritingStatus);

promisifiedReadFile("sampleFile.txt").then(fileReadingStatus); //fileStatus works after hello.txt gets read succesfully

promisifiedCleanFile("sampleFile.txt").then(fileCleaningStatus);


// --------------------writing own promise class---------------------------

class Promised{
    constructor(asyncfn){
        function complete(){
            this.resolve();
        }
        asyncfn(complete);
    }
    then(callback){
        this.resolve=callback;
    }
}