// Html, Css and Js were meant to browser libraries as they were supposed to be used on browsers only

// Node js is an open-source JS runtime that allows you to execute JavaScript code on the server side. It's built
//  on Chrome's V8 JavaScript engine.
// Node js was introdused to make us run js code on both frontend and backend
// Runtime is a Enviornment where JS code can be executed

// V8 engine?
// The V8 engine is an open-source JavaScript engine developed by Google. It is used to execute JavaScript code 
// in various environments, most notably in the Google Chrome web browser.


// Fs library is only availaible on node, not in browsers for security and privacy
// Similay DOM is not a part of Node as it doesn't make sence there

// Nodejs is a js runtime that uses v8 engine

// Bun is another js runtime written using zig which is taking over nodejs, and is replacing it, as node is 
// very slow, bun is just an interpreter(next js projects arent compatible with node js)


// Nodejs, bun and browserss are just trying to implement ecma script standards thats it


// run npm init -y
//contents of package.json file
/* {
//external dependencies
  "name": "week4",   //name of website/library/app   
  "version": "1.0.0", //change this version as you update the code
  "main": "classNotes4.1.js",  //entry point
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1" //this lets us add multiple scripts, which can be reun using npm run test or npm run start, can use whatever nape you want
    "start": "node classNotes4.1.js" //try running this in terminal using npm run start, after adding this to package.json
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "", //all these are meta data
  "dependencies" : {
    "chalk": "^5.3.0" versions: major.minor.patch(change major for breaking change, change minor for small changes-this changed version is supposed to be compatible with the prev version, change patch when fixing small bugs), ^5 (^)caret sign suggests to update the version whenever new comes out but dont go over major version 5(i.e. to 6 auyomatically) if version is written without ^ sign the version wi=ritten will be installed. The main problem of this arises in developement when multiple folks care cloning this repository, they get different version installed for themselvs due to this ^ symbol or when the code is deployed the server might have different version installed, to solve thos a package-lock.json file conmes in handy which makes sure that same version of the package is installed for everyone. Changing version in package and running npm run will automatically install that version
    "chalk": "latest" will install latest version
    The package-lock, json records the exact versions of all dependencies and their dependencies (sub-dependencies) that are installed at the time when npm install was run.
    //should we deploy package-lock files on github??? The answer is yes, we gotta make sure that everyone has same version installed locally
    //this section along with scripts is most inportant
    //this contains all the dependencies required by codebase, can be used to keep track of all the dependencies used,
    when one package is installed it also contains some dependencies with itselvs has its own set of dependencies, that's why node modules are so heavy
    when one run npm install all dependencies automatically gets install, theses no need of node modules folder
  }

  comes in handy when deploying an npm package to external registry
*/




// NPM(node package manager), for js used for managing library/external dependencies/packages(reusable code)
//can deploy my package at npm registory


// Understanding internal packages
// internal packages are provided by js out of the box like fs, path, and http
path=require("path")
console.log(__dirname); //prints the current directory
console.log(path.join(__dirname,"classNotes4.1.js"));
console.log(path.join(__dirname,"../../classNotes4.1.js/Projects/Atmosonic")); //can do this manually using string concatination


//external library: written by some other people we're just using it

// import chalk from "chalk";  //modern import syntax
// console.log(chalk.red("Hello")+chalk.green.strikethrough.underline.bold(" W orld"));


//Assignment 1: Create a CLI(command line interface, basically doing smthn using terminal(cmd line)) for reading a file and outputting the no. of words innnit

//installed: npm install commander
const { Command } = require('commander');
// const chalk= require('chalk');
const { log } = require("console");
const program = new Command();

program
  .name('Words-a-File')
  .description('Count the no. of words in a file.......')
  .version('0.1.0');

program.command('countwords')
  .description('Count the no. of words in a file.......')
  .argument('<string>', 'Path of file to count words of') //Usage: scriptName commandname [options] <string>
  .option('--first', 'display just the first word')
  // .option('-s, --separator <char>', 'separator character', ',')
  .action((str, options) => {
    const limit = options.first ? 1 : undefined;
    let content="";
    if(!str){
      console.log("Enter file name to start");
      
    }
    else{
      fileObj=require("fs");
      fileObj.readFile(str,"utf-8",(err,data)=>{
        if(!err){
          content=data;
          arr=data.split(" ");
          words=arr.length+1;
          console.log(`You've ${words} in this file`);
        }
        else{
          console.log("There was a problem reading file check error for description");
          
          throw err;
        }
        limit?console.log(content.split(" ", limit)):null;
      })

    }
    // console.log(content.split(options.separator, limit)); options.seperator returns the value of seperator option entered, limit used to return the aray with the number of characters = limit in array
  });

program.parse();
// instead of using this fn in cli like this: node classNotes4.1.js countwords testfile.txt one can give alias countercli= node classNotes4.1.js and use countercli countwords testfile.txt


console.log(process.argv); //this returns all the arguments used to call this, like node classNotes4.1.js it will return path of all this