# Notes

## Github

Order of operations
1. pull to ensure you are updated
2. edit files as you work
3. add to stage changes
4. commit to save changes
5. push to update the remote repo with your changes


## Midterm Questions

### In the following code, what does the link element do?
- link is used to define a relationship between HTML and an external resource, most commonly used to link an HTML file to a CSS stylesheet.
- example: <link rel="stylesheet" href="styles.css">
- rel="stylesheet" specifies that the link is to a CSS file, href="styles.css" specifies the location of the file.

### In the following code,  what does a div tag do?
- the <div> tag is a block-level container used to group elements for styling purposes
- example: 
<div class="container">
    <p>Some text inside a div.</p>
</div>

### In the following code, what is the difference between the #title and .grid selector?
- #title: this is an ID selector, used to target and element with a unique id="title", it should be used for only one element on the page
- example:
#title {
    font-size: 20px;
}
- .grid: this is a class selector, used to target all elements with the class="grid", multiple elements can share the same class
.grid {
    display: grid;
}

### In the following code, what is the difference between padding and margin?
- padding: the space inside an element between the content and border
- margin: the space outside an element's border that seperates it from other elements
- example: | Margin | Border | Padding | Content |
.box {
    padding: 20px; /* space inside the box */
    margin: 15px;  /* space outside the box */
}

### Given this HTML and this CSS how will the images be displayed using flex?
- when using a flexbox, elements are aligned along a flexible layout model
- by default, items in a flex container are placed horizontally in a row and take up as much space as needed
.container {
    display: flex;
}
.container img {
    width: 100px;
    height: auto;
}

### What does the following padding CSS do?
- if just one value is specified, all 4 sides have that size, if two (padding: 10px, 20px) 10px on top/bottom, 20px for left/right
- example: padding: 10px 20px 30px 40px;
- this shorthand sets the padding for each side of an element in clockwise order: 10px from the top, 20px from the right, 30px from the bottom, 40px from the left

### What does the following code using arrow syntax function declaration do?
- arrow functions are a shorter syntax for writing functions in JS
- no need for return keyword, they return automatically if the function body is a single expression
- example: const add = (a, b) => a + b;
- this code declares an arrow function add that takes two arguments a and ba and returns their sum

### What does the following code using map with an array output?
- the map() function creates a new array by applying a function to each elements of the original array
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(num => num * 2);
console.log(doubled);
- in this case, the map() method multiplies each number in the array by 2
- map does not modify the original array, it returns a new array with transformed values

### What does the following code output using getElementByID and addEventListener?
- the getElementById() method is used to select an HTML element by its id, and addEventListener() is used to attach an event to that element
document.getElementById("myButton").addEventListener("click", function() {
    alert("Button was clicked!");
});
- this code selects an element with the id="myButton", and it attaches a click event listener to that element, when the button is clicked, an alert box appears witht he message "button was clicked!"

### What does the following line of Javascript do using a # selector?
- in JS, the # selector is used to reference an element by its id in CSS or through querySelector
document.querySelector("#title").textContent = "Hello, World!";
- querySelector("#title") selects the element with id="title", and textContent = "Hello, World!" changes the text inside that element to "Hello, World!".

### Which of the following are true? (mark all that are true about the DOM)
- the DOM (document object model) is a programming interface for web documents
- truths: 
The DOM represents the structure of the HTML page as a tree of nodes (elements, attributes, text, etc.).
JavaScript can manipulate the DOM by adding, removing, or modifying elements.
Elements in the DOM can be accessed and manipulated through methods like getElementById(), querySelector(), and others.
The DOM provides event handling (like addEventListener) to respond to user actions.
The DOM is a tree structure where each element is a node.
JavaScript can modify the DOM to dynamically change the webpage.
Events like click, keyup, etc., can be handled through the DOM.

### By default, the HTML span element has a default CSS display property value of: 
- by default, a <span> element has the display property value of inline.
- inline elements only take up as much space as needed and flow within the text (they don't break the line)
- in contrast, block elements take up the full width available and always start on a new line

### How would you use CSS to change all the div elements to have a background color of red?
- you can select all <div> elements and apply a background color
- example:
div {
    background-color: red;
}

### How would you display an image with a hyperlink in HTML?
- to create an image that functions as a clickable link, wrap the <img> element inside an <a> anchor element
- example: 
<a href="https://www.example.com">
    <img src="image.jpg" alt="Example Image">
</a>

### In the CSS box model, what is the ordering of the box layers starting at the inside and working out?
- Layers (inside to outside)
1. Content: The actual content, such as text or images.
2. Padding: Space between the content and the border.
3. Border: Surrounds the padding (and content).
4. Margin: Space between the border and other elements.

### Given the following HTML, what CSS would you use to set the text "trouble" to green and leave the "double" text unaffected?
- you can wrap the "trouble" text in a span and apply a CSS rule to that span.
- html: <p><span class="green-text">trouble</span>double</p>
- css: 
.green-text {
    color: green;
}

### What will the following code output when executed using a for loop and console.log?
- example: 
for (let i = 0; i < 5; i++) {
    console.log(i);
}
- the loop starts with i = 0, and runs while i < 5, with i incrementing by 1, so it runs 5 times with i taking values from 0 to 4
- the console.log(i) prints the value of i during each iteration
output:
0
1
2
3
4

### How would you use JavaScript to select an element with the id of “byu” and change the text color of that element to green?
- in JS, we can use getElementById() or querySelector() to select an elemnt by its id and then modify its style
- example: document.getElementById("byu").style.color = "green";
- getElementById("byu"): This selects the element with the id="byu".
- .style.color = "green": This sets the CSS color property of that element to green.
- Selecting elements: getElementById("byu") and querySelector("#byu") are both valid ways to select an element by id.

### What is the opening HTML tag for a paragraph, ordered list, unordered list, second level heading, first level heading, third level heading?
- Paragraph: <p>
- Ordered List: <ol>
- Unordered List: <ul>
- Second Level Heading: <h2>
- First Level Heading: <h1>
- Third Level Heading: <h3>

### How do you declare the document type to be html?
- at the very top of an HTML document, use <!DOCTYPE html>

### What is valid javascript syntax for if, else, for, while, switch statements?
- if and else:
if (condition) {
    // code to execute if condition is true
} else {
    // code to execute if condition is false
}
- for loop:
for (initialization; condition; increment) {
    // code to execute in each loop iteration
}
- while loop:
while (condition) {
    // code to execute as long as the condition is true
}
- switch statement:
switch (expression) {
    case value1:
        // code to execute if expression equals value1
        break;
    case value2:
        // code to execute if expression equals value2
        break;
    default:
        // code to execute if no case matches
}

### What is the correct syntax for creating a javascript object?
- javascript objects are created using {}, with properties and values defined inside
- example:
const person = {
    firstName: "John",
    lastName: "Doe",
    age: 30
};
- This creates an object person with three properties: firstName, lastName, and age.

### Is it possible to add new properties to javascript objects?
- yes, here is an example:
const person = {
    firstName: "John",
    lastName: "Doe"
};
person.age = 30;  // Adding a new property 'age'
console.log(person);
- this adds a new age property to the person object

### If you want to include JavaScript on an HTML page, which tag do you use?
- you use the <script> tag
- example: <script src="script.js"></script>
- this eample includes an external JS file(script.js), you can also write inline JS inside a <script> tag:
<script>
  console.log("Hello, World!");
</script>

### Given the following HTML, what JavaScript could you use to set the text "animal" to "crow" and leave the "fish" text unaffected?
- example HTML:
<p id="animal">animal</p>
<p id="fish">fish</p>

- JS: document.getElementById("animal").textContent = "crow";
- this selects the element with id="animal" and sets its text context to "crow", the element with id="fish" remains unaffected

### Which of the following correctly describes JSON?
- JSON (JavaScript Object Notation) is a lightweight data-interchange format, which is easy to read and write and easy for machines to parse and generate
- JSON is text based and represents data as key-value pairs
- it is often used for transfering data betwen a server and client
- similar to JS objects but must use double quotes for keys and string values
- example: 
{
  "firstName": "John",
  "lastName": "Doe",
  "age": 30
}

### What does the console command chmod, pwd, cd, ls, vim, nano, mkdir, mv, rm, man, ssh, ps, wget, sudo  do?
- these are terminal commands used for file management, navigation, and system operations:
- chmod: Changes the permissions of a file or directory.
- pwd: Prints the current working directory.
- cd: Changes the current directory.
- ls: Lists files and directories.
- vim: Opens the vim text editor.
- nano: Opens the nano text editor.
- mkdir: Creates a new directory.
- mv: Moves or renames files and directories.
- rm: Removes (deletes) files or directories.
- man: Displays the manual (help) for a command.
- ssh: Connects to a remote server via a secure shell.
- ps: Displays currently running processes.
- wget: Downloads files from the internet.
- sudo: Executes a command with superuser privileges.


### Which of the following console command creates a remote shell session?
- the ssh (secure shell) command creates a remote shell session, allowing you to connect to a remote machine
- example: ssh username@hostname

### Which of the following is true when the -la parameter is specified for the ls console command?
- the ls command lists files and directories in Linux
- the -l command is long format listing, which provides detailed info about each file (permessions, ownership, file size, timestamp)
- the -a command displays all files, including hidden files (those starting with a .)
- so when using ls -la, it will display all files in long format

### Which of the following is true for the domain name banana.fruit.bozo.click, which is the top level domain, which is a subdomain, which is a root domain?
- Top-Level Domain (TLD): is .click, the last part of the domain name
- Root Domain: is bozo.click, this is the primary domain that you control or own
- Subdomain: is banana.fruit, appears before the root domain and can represent different sections or services (like www or blog)

### Is a web certificate is necessary to use HTTPS.
- yes, a for HTTPS, a website must have an SSL/TLS certificate issued by a trusted certificate authority
- this verifies the website's identity and establishes a secure, encrypted connection
- without a certificate, you cannot enable HTTPS, and the connection will remain unencrypted, or use HTTP

### Can a DNS A record can point to an IP address or another A record.
- A DNS A record maps a domain name to an IP address (IPv4), it can only point to an IP address, not to another A record
- a CNAME recored is used to point to another domain name

### Port 443, 80, 22 is reserved for which protocol?
- Port 443: reserved for HTTPS traffic, used for secure web conneciton
- port 80: reserved for HTTP traffic, used for standard, unsecured web communication.
- port 22: reserved for SSH, used for secure remote login to a computer or server

### What will the following code using Promises output when executed?
- a promise in JS is an object representing the eventual completion or failure of an asynchronous operation
- example:
let promise = new Promise((resolve, reject) => {
    let success = true;  // Change this to false to test rejection

    if (success) {
        resolve("Promise resolved successfully!");
    } else {
        reject("Promise was rejected.");
    }
});
promise
    .then((result) => {
        console.log(result);  // Logs if resolved
    })
    .catch((error) => {
        console.log(error);  // Logs if rejected
    });
- if success is true, the promise will resolve, and the .then() block will execute, logging "Promise resolved successfully!"
- if success is false, the promise will reject, and the .catch() block will execute, logging "Promise was rejected."
