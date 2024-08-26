// DOM(document object model) is basically a programming interface for web documents which structures(or abstracts) 
// webpage in object of trees

// Dom basically allows js scripts to manipulate the structure of web page(dynamically)
// DOM is only availaible in browsers, node js doesn't support dom


/*In early times script was suupposed to be put just before end of the body tag, to understand this we have to know 
how a webpage is rendered, first the html contentend is rendered as soon as the script tag is encountered it the 
parsor stops rendering html and wait for script file to load completely the the contents of the script file is 
parsed and dom manipulations are done after that the Html page renders completely. Putting script at bottom 
is also bad as we want script to load asap, but putting it in head was the worst as the rendering of html 
will stop and site will take longer time to load, to fix this <script src="path/to/script1.js" async></script> or
<script src="path/to/script2.js" defer></script> async and defer attribute are used which name suggests loads 
script file asynchronously, without blocking browser, Scripts with the defer attribute are executed in order 
(i.e. first script 1, then script 2). This also does not block the browser.Unlike async scripts, defer scripts are 
only executed after the entire document has been loaded.


Steps of WebGL2 Rendering
1. ContextFetch the HTML page (e.g. index.html)
2. Begin parsing the HTML
3. The parser encounters a <script> tag referencing an external script file.
4. The browser requests the script file. Meanwhile, the parser blocks and stops parsing the other HTML on your page.
5. After some time the script is downloaded and subsequently executed.
6. The parser continues parsing the rest of the HTML document.

Step 4 is where things get bad and site loading increases this happens because , Any script can insert its own HTML 
via document.write() or other DOM manipulations. This implies that the parser has to wait until the script has been 
downloaded and executed before it can safely parse the rest of the document. After all, the script could have inserted 
its own HTML in the document.
Modern practice is to no longer manipulate the DOM while the document is loading. Instead, wait until the 
document has been loaded before modifying it. For example:
document.addEventListener("DOMContentLoaded", function() {
    // this function runs when the DOM is ready, i.e. when the document has been parsed
    document.getElementById("user-greeting").textContent = "Welcome back, Bart";
});
 along with async or dever attribute in the script tag
*/

// Document object gives the reference to the top level HTML AllCollection, and it can be used to acess any of 
// the Node(tag) of the tree(web document)


/* METHODS FOR FETCHING ELEMENTS(dom apis)

1. document.querySelector(h1 or .class-name or #idName) : returns the single element object
2. document.querySelectorAll(h1 or .class-name or #idName) : returns nodelist(array) of element objects, which is static i.e it wont update even if new elements are added
3. document.getElementsbyId("idName") : returns the single element object
4. document.getElementsByClassName("class-name")
5. document.getElementsByTagName("tagname") : 4th and 5th method returns HTMLCOLLECTION objects that acts like an array, this list gets updated if more elements are added


Traversing the DOM

Another way to access elements is to "traverse" the DOM tree using properties
1. firstElementChild
2. lastElementChild
3. nextElementChild/nextElementSibling
4. previousElementChild/previousElementSibling
5. childNodes
6. childElementCount
7. parentNode
For example:
decument.children();
var salsMotto = document.getElementById("salsMotto");
console.log(salsMotto.childNodes[2]);

These properties are not available on Text nodes, only on Element nodes. To make sure you can traverse an element, 
you can check its nodeType/nodeValue properties.


=> CREATING AN ELEMENT:

ele=document.createElement("div"); //this just creates the element doesn't add it to dom for that addElement method to the parent node is used
ele.innerHtml="<smthn/>"; 
parent=document.getElementById("id");
parent.appendChild(ele);


=> MODIFYING ATTRIBUTES OF AN ELEMENT:

element=document.querySelector("h1")
element.setAttribute("class","towhat") can be used to change any attribute
element.removeAttribute() to remove attribute
element.getAttribute() //to return attributes of element

=> CHANGING STYLE OF ELEMENT

element.style.color = "hotpink"; (hyphens are not valid js names)


=> ADDING CLASSNAME

element.className += " warning"; (for adding class name)
element.className = " warning"; (for overriding class name)


=> ACCESSING AND MODIFYNG HTML OF ELEMENT

element.innerHTML; //for accessing
element.innerHTML = "cats are the <strong>cutest</strong>"; //for modifying


=> ACCESSING AND MODIFYNG HTML OF ELEMENT

element.textContent; //for accessing
element.textContent = "ccats are the cutest"; //for modifying

should be careful when using either of these 2 properties, because they will also remove event listeners

=> EVENT LISTENERS
<button onclick="fnToCall()"></button>

btn=document.getElementById("btn");
btn.addEventListener("click",callback) this method returns info about the event that hapenned, so parameter of callback can receive it
If you are overriding click behavior on a link or submit behavior on a form, you may want to call 
event.preventDefault() to prevent the browser's default behavior.

btn.removeEventListener("click",callback) to remove event listener
If you are overriding click behavior on a link or submit behavior on a form, you may want to call 
event.preventDefault() to prevent the browser's default behavior.



Question asked by someone in class: if we delete child and some function uses it then the parent would delete as in
like os we nave zombie process so it would happen here or delete whole whole thing?
Kirat's Answer: The element is just removed from the dom it does still stays in js memory, but since its removed from 
dom it cant be acessed by any fn




*/

// Kirat asked to do this in class
// let time=document.querySelector("p");
// counter=0;
// setInterval(()=>{
// 	counter++;
// 	time.innerHTML=counter;}
// 	,1000);

