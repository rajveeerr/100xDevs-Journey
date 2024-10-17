// React is used for making dynamic sites, for static sites its not recommended b/c it increases the bundel size, the code will 
// contain js that will point to another react file

// React is just an easier way of writing html css and js code, its a new syntax that under the hood gets converted to the html,
//  css and js upon building it, this html, css and js code is deployed

// Doing dom manipulations conventional way is very hard, there were many libraries solving this issue, to name: jquery, 
// react/VueJs provides completely new syntax for writing html,css and js which is very readable and clean

/* React(Dynamic Website) Jargons:

State: It is an object representing the current state of the application, it represent the dynamic things in the app, 
it is the part of the site that is changing

-Updating/changing state will simply update the app, eg: changing the state of title, will also update the title of card on app,
-upon change in state, react will automatically update this change in the app

Components: Components are the static parts of the page, tells how the dom should be rendered given the state, it is reusable
 dynamic and changes with the state, toh basically component is how does the application look, the positioning of element, its
 styling

Crux: ommponent is the outer thing that gives structure and state is the inner thing that changes

Note: it isn't necessary ki every state will reside in a component

React is a diff calculator, it basically compares the old state and the new state and renders the difference if any

Re-rendering: Now the actual process of doing dom manipulations upon state change is called re-rendering. a state change triggers
re-render

(render sort of means painting)

React brief:
- create a bunch of components
- describe the state of components, and link those state and components, basically tell ki uopn changing this state which component
// should be changed
- after this render will do the dom manipulations and render and re-render whenever there is change in state


JSX stands for javascript xml, xml is something similar to json, format of sharing data. XML alows us to write html like code
directly within the js, this make it easier to create uis in react, jsx is syntax extension for js

a component exports xml, not html

whatever starts with 'use' in react is a hook

NOTE: never do dom manipulations manually in react


const arr=[var1,var2], this var is constant so tits length cant be changed, no new element can be added to it but the variables 
can be changes, so to make an array actually constant we can use Object.freeze()

const [elem1, elem2] = Object. freeze(['valuel', 'value2']);

/arr and objects are collection
 */


// How does react does re-rendering the optimal way?? idk, but to optimise my todo app from week 3, i will simply, check what
// has chamged in the state variable, and will generate te component of of the changed variable and will put it to its correct
// place in the dom wilhout clearing all the other elements



// Till this point in the cohort firstly i learnt how the things were done in the past when there was no react, i created balanzio
// with dom, did jwt and now i am uncovering the problems i had with that approach and now shifting to frameworks like react and 
// next to solve those problems
