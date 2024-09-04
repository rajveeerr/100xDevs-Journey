## File cleaner
Read a file, remove all the extra spaces and write it back to the same file.

For example, if the file input was
```
hello     world    my    name   is       raman
```

After the program runs, the output should be

```
hello world my name is raman

```

fileObj=require("fs");
function cleanFile(fileName){
    fileObj.readFile(fileName,"utf-8",(err,data)=>{
        if(err){
            console.log("Error Occured while reading file. ERROR STATUS: "+err)
            return -1;
        }
        fileContent=data.trim();
        fileObj.writeFile(fileName,fileContent,(err)=>{
            if(err){
                console.log("There was a problem writing to the file. ERROR STaTUS: "+err);
            }
            console.log(`File has been CLEANED SuccesfullY!!! The content of the file are: ${fileContent}`);
            return fileContent;
        });
    });
}

cleanFile("newFile.txt");