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
    //this section along with scripts is most inportant
  }

  deploying an npm package to external registry
*/




// NPM(node package manager), for js used for managing library/external dependencies/packages(reusable code)
//can deploy my package at npm registory

import chalk from "chalk";  //modern import syntax
console.log(chalk.red("Hello")+chalk.green.strikethrough.underline.bold(" W orld"));

// Understanding internal packages
// internal packages are provided by js out of the box like fs, path, and http